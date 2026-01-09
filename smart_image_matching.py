#!/usr/bin/env python3
"""
智能图片匹配验证 - 结合文档内容信息进行匹配验证
"""

import os
import json
import fitz  # PyMuPDF
import zipfile
import re
from pathlib import Path
from PIL import Image

class DocumentContentAnalyzer:
    """文档内容分析器"""
    
    def __init__(self, base_dir):
        self.base_dir = base_dir
        self.pdf_path = os.path.join(base_dir, "普耐斯笔记本20111125(转曲）.pdf")
        self.pptx_path = os.path.join(base_dir, "商品推荐-2.pptx")
        self.extracted_dir = os.path.join(base_dir, "extracted_images")
    
    def extract_pdf_text_content(self):
        """提取PDF文档的文本内容"""
        pdf_content = {}
        
        try:
            pdf_document = fitz.open(self.pdf_path)
            
            for page_num in range(len(pdf_document)):
                page = pdf_document.load_page(page_num)
                text = page.get_text()
                
                # 获取该页面的图片信息
                image_list = page.get_images()
                
                pdf_content[page_num + 1] = {
                    'text': text,
                    'image_count': len(image_list),
                    'images': [f"pdf_page_{page_num + 1}_img_{i + 1}.png" for i in range(len(image_list))]
                }
                
                print(f"PDF页面 {page_num + 1}: {len(text)} 字符, {len(image_list)} 张图片")
                if text.strip():
                    print(f"  文本预览: {text[:100].replace(chr(10), ' ')}")
            
            pdf_document.close()
            
        except Exception as e:
            print(f"PDF文本提取失败: {e}")
        
        return pdf_content
    
    def extract_pptx_slide_content(self):
        """提取PPTX文档的幻灯片内容"""
        try:
            from python_pptx import Presentation
            
            pptx_content = {}
            prs = Presentation(self.pptx_path)
            
            for slide_num, slide in enumerate(prs.slides):
                slide_text = ""
                image_count = 0
                
                # 提取文本内容
                for shape in slide.shapes:
                    if hasattr(shape, "text"):
                        slide_text += shape.text + " "
                    elif shape.shape_type == 13:  # MSO_SHAPE_TYPE.PICTURE
                        image_count += 1
                
                pptx_content[slide_num + 1] = {
                    'text': slide_text.strip(),
                    'image_count': image_count,
                    'slide_number': slide_num + 1
                }
                
                print(f"PPT幻灯片 {slide_num + 1}: {len(slide_text)} 字符, {image_count} 张图片")
                if slide_text.strip():
                    print(f"  文本预览: {slide_text[:100]}")
            
            return pptx_content
            
        except ImportError:
            print("python-pptx未安装，使用备用方法...")
            return self.extract_pptx_content_zip()
    
    def extract_pptx_content_zip(self):
        """通过解压缩方法提取PPTX内容"""
        pptx_content = {}
        
        try:
            with zipfile.ZipFile(self.pptx_path, 'r') as zip_ref:
                # 查找幻灯片文件
                slide_files = [f for f in zip_ref.namelist() if f.startswith('ppt/slides/slide') and f.endswith('.xml')]
                slide_files.sort()
                
                for i, slide_file in enumerate(slide_files):
                    try:
                        content = zip_ref.read(slide_file).decode('utf-8')
                        # 简单的文本提取（去除XML标签）
                        text = re.sub(r'<[^>]+>', '', content)
                        text = re.sub(r'\s+', ' ', text).strip()
                        
                        pptx_content[i + 1] = {
                            'text': text,
                            'slide_file': slide_file,
                            'slide_number': i + 1
                        }
                        
                        print(f"PPT幻灯片 {i + 1}: {len(text)} 字符")
                        if text and len(text) > 50:
                            # 查找中文关键词
                            chinese_text = re.findall(r'[\u4e00-\u9fff]+', text)
                            if chinese_text:
                                print(f"  关键词: {' '.join(chinese_text[:10])}")
                        
                    except Exception as e:
                        print(f"处理幻灯片 {slide_file} 失败: {e}")
                        continue
        
        except Exception as e:
            print(f"PPTX内容提取失败: {e}")
        
        return pptx_content

class ProductImageMatcher:
    """产品图片智能匹配器"""
    
    def __init__(self, base_dir):
        self.base_dir = base_dir
        self.analyzer = DocumentContentAnalyzer(base_dir)
        
        # 产品关键词字典
        self.product_keywords = {
            "taiwan-yunghua-cutting-line": {
                "keywords": ["台湾", "荣华", "裁切", "生产线", "分条", "钢材", "金属", "切割", "机械"],
                "priority": 1,  # 最高优先级
                "name": "台湾荣华钢材裁切生产线"
            },
            "steel-coil-cart": {
                "keywords": ["钢卷", "台车", "移动", "运载", "车", "载重", "运输"],
                "priority": 2,
                "name": "钢卷移动台车"
            },
            "mechanical-coil-flipper": {
                "keywords": ["翻倒", "翻转", "机械", "钢卷", "齿条", "摩擦轮"],
                "priority": 2,
                "name": "机械式钢卷翻倒机"
            },
            "steel-strip-cutter": {
                "keywords": ["钢带", "剪断", "切断", "剪切", "切割"],
                "priority": 2,
                "name": "钢带剪断机"
            },
            "jdc-belt-tensioner": {
                "keywords": ["JDC", "皮带", "张紧", "日本", "专利", "卷紧"],
                "priority": 3,
                "name": "日本JDC皮带张紧器"
            },
            "hydraulic-nut": {
                "keywords": ["液压", "螺母", "紧固", "夹具", "圆刀", "锁紧"],
                "priority": 3,
                "name": "液压螺母"
            }
        }
    
    def calculate_content_match_score(self, content_text, product_keywords):
        """计算内容匹配分数"""
        if not content_text:
            return 0
        
        score = 0
        found_keywords = []
        
        for keyword in product_keywords:
            if keyword in content_text:
                score += 1
                found_keywords.append(keyword)
        
        return {
            'score': score,
            'total_keywords': len(product_keywords),
            'percentage': round((score / len(product_keywords)) * 100, 1) if product_keywords else 0,
            'found_keywords': found_keywords
        }
    
    def analyze_pdf_content_matching(self, pdf_content):
        """分析PDF内容与产品的匹配度"""
        pdf_matches = {}
        
        for page_num, page_data in pdf_content.items():
            page_text = page_data.get('text', '')
            images = page_data.get('images', [])
            
            print(f"\n分析PDF页面 {page_num}:")
            print(f"图片: {images}")
            
            # 为每个产品计算匹配分数
            page_matches = {}
            for product_id, product_info in self.product_keywords.items():
                match_result = self.calculate_content_match_score(page_text, product_info['keywords'])
                
                if match_result['score'] > 0:
                    page_matches[product_id] = match_result
                    print(f"  {product_info['name']}: {match_result['score']} 个关键词匹配 ({match_result['percentage']}%)")
                    print(f"    匹配词: {', '.join(match_result['found_keywords'])}")
            
            if page_matches:
                pdf_matches[page_num] = {
                    'images': images,
                    'matches': page_matches,
                    'text_preview': page_text[:200] if page_text else ''
                }
        
        return pdf_matches
    
    def analyze_pptx_content_matching(self, pptx_content):
        """分析PPTX内容与产品的匹配度"""
        # PPTX图片按顺序编号，需要映射到实际文件
        pptx_image_files = [
            "pptx_image1.jpeg", "pptx_image2.png", "pptx_image3.jpeg", "pptx_image4.png",
            "pptx_image5.jpeg", "pptx_image6.jpeg", "pptx_image7.jpeg", "pptx_image8.jpeg",
            "pptx_image9.jpeg", "pptx_image10.jpeg", "pptx_image11.jpeg", "pptx_image12.png",
            "pptx_image13.png", "pptx_image14.jpeg"
        ]
        
        pptx_matches = {}
        
        for slide_num, slide_data in pptx_content.items():
            slide_text = slide_data.get('text', '')
            
            print(f"\n分析PPT幻灯片 {slide_num}:")
            
            # 为每个产品计算匹配分数
            slide_matches = {}
            for product_id, product_info in self.product_keywords.items():
                match_result = self.calculate_content_match_score(slide_text, product_info['keywords'])
                
                if match_result['score'] > 0:
                    slide_matches[product_id] = match_result
                    print(f"  {product_info['name']}: {match_result['score']} 个关键词匹配 ({match_result['percentage']}%)")
                    print(f"    匹配词: {', '.join(match_result['found_keywords'])}")
            
            if slide_matches:
                pptx_matches[slide_num] = {
                    'matches': slide_matches,
                    'text_preview': slide_text[:200] if slide_text else ''
                }
        
        return pptx_matches
    
    def generate_improved_matching(self, pdf_matches, pptx_matches):
        """生成改进的图片匹配方案"""
        print(f"\n{'='*60}")
        print("生成改进的匹配方案...")
        
        # 收集所有匹配信息
        all_matches = {}
        
        # PDF匹配信息
        for page_num, page_data in pdf_matches.items():
            images = page_data['images']
            matches = page_data['matches']
            
            for image in images:
                if image not in all_matches:
                    all_matches[image] = {'source': 'pdf', 'page': page_num, 'candidates': []}
                
                for product_id, match_info in matches.items():
                    all_matches[image]['candidates'].append({
                        'product_id': product_id,
                        'score': match_info['score'],
                        'percentage': match_info['percentage'],
                        'keywords': match_info['found_keywords']
                    })
        
        # PPTX匹配信息 (需要更复杂的映射逻辑)
        for slide_num, slide_data in pptx_matches.items():
            matches = slide_data['matches']
            # 这里简化处理，假设每个幻灯片对应一张主要图片
            pptx_image = f"pptx_image{slide_num}.jpeg"
            
            if pptx_image not in all_matches:
                all_matches[pptx_image] = {'source': 'pptx', 'slide': slide_num, 'candidates': []}
            
            for product_id, match_info in matches.items():
                all_matches[pptx_image]['candidates'].append({
                    'product_id': product_id,
                    'score': match_info['score'],
                    'percentage': match_info['percentage'],
                    'keywords': match_info['found_keywords']
                })
        
        # 生成最佳匹配建议
        best_matches = {}
        used_images = set()
        
        # 按产品优先级排序
        products_by_priority = sorted(
            self.product_keywords.items(),
            key=lambda x: (x[1]['priority'], x[0])
        )
        
        for product_id, product_info in products_by_priority:
            best_image = None
            best_score = 0
            
            # 查找最佳匹配图片
            for image_file, image_data in all_matches.items():
                if image_file in used_images:
                    continue
                
                # 查找该图片对此产品的匹配分数
                for candidate in image_data['candidates']:
                    if candidate['product_id'] == product_id and candidate['score'] > best_score:
                        best_score = candidate['score']
                        best_image = image_file
            
            if best_image and best_score > 0:
                best_matches[product_id] = {
                    'image_file': best_image,
                    'score': best_score,
                    'source_info': all_matches[best_image],
                    'confidence': 'high' if best_score >= 3 else 'medium' if best_score >= 2 else 'low'
                }
                used_images.add(best_image)
                
                print(f"✅ {product_info['name']}: {best_image} (分数: {best_score}, 置信度: {best_matches[product_id]['confidence']})")
            else:
                print(f"❌ {product_info['name']}: 未找到合适的匹配图片")
        
        return best_matches, all_matches
    
    def create_verification_report(self, best_matches, all_matches):
        """创建详细的验证报告"""
        
        report = {
            'matching_results': best_matches,
            'all_candidates': all_matches,
            'recommendations': [],
            'warnings': []
        }
        
        print(f"\n{'='*60}")
        print("匹配验证报告:")
        
        # 检查当前匹配与新建议的差异
        current_mapping_file = os.path.join(self.base_dir, "new-website", "src", "data", "product-images-mapping.json")
        
        if os.path.exists(current_mapping_file):
            with open(current_mapping_file, 'r', encoding='utf-8') as f:
                current_mapping = json.load(f)
            
            print("\n当前匹配 vs 建议匹配:")
            for product_id, current_info in current_mapping.items():
                current_source = current_info['original_source']
                
                if product_id in best_matches:
                    suggested_image = best_matches[product_id]['image_file']
                    confidence = best_matches[product_id]['confidence']
                    
                    if current_source != suggested_image:
                        print(f"🔄 {product_id}:")
                        print(f"   当前: {current_source}")
                        print(f"   建议: {suggested_image} (置信度: {confidence})")
                        report['recommendations'].append({
                            'product_id': product_id,
                            'current_image': current_source,
                            'suggested_image': suggested_image,
                            'confidence': confidence,
                            'reason': f"基于文档内容匹配分数 {best_matches[product_id]['score']}"
                        })
                    else:
                        print(f"✅ {product_id}: 当前匹配正确 ({current_source})")
                else:
                    print(f"⚠️  {product_id}: 未找到基于内容的匹配建议")
                    report['warnings'].append({
                        'product_id': product_id,
                        'issue': '未找到基于文档内容的匹配',
                        'current_image': current_source
                    })
        
        # 保存报告
        report_file = os.path.join(self.base_dir, "content_based_matching_report.json")
        with open(report_file, 'w', encoding='utf-8') as f:
            json.dump(report, f, ensure_ascii=False, indent=2)
        
        print(f"\n详细报告已保存到: {report_file}")
        return report

def main():
    """主函数"""
    base_dir = "/Users/jasonyin/project/electromechanical-landing"
    
    print("=== 智能图片匹配验证系统 ===")
    print("基于PDF和PPT文档内容进行匹配验证...")
    
    try:
        matcher = ProductImageMatcher(base_dir)
        
        # 1. 提取文档内容
        print("\n1. 提取PDF文档内容...")
        pdf_content = matcher.analyzer.extract_pdf_text_content()
        
        print("\n2. 提取PPT文档内容...")
        pptx_content = matcher.analyzer.extract_pptx_slide_content()
        
        # 2. 分析内容匹配度
        print("\n3. 分析PDF内容匹配...")
        pdf_matches = matcher.analyze_pdf_content_matching(pdf_content)
        
        print("\n4. 分析PPT内容匹配...")
        pptx_matches = matcher.analyze_pptx_content_matching(pptx_content)
        
        # 3. 生成改进建议
        print("\n5. 生成匹配改进建议...")
        best_matches, all_matches = matcher.generate_improved_matching(pdf_matches, pptx_matches)
        
        # 4. 创建验证报告
        print("\n6. 创建验证报告...")
        report = matcher.create_verification_report(best_matches, all_matches)
        
        print(f"\n任务完成!")
        print(f"- 分析了 {len(pdf_content)} 个PDF页面")
        print(f"- 分析了 {len(pptx_content)} 个PPT幻灯片")
        print(f"- 生成了 {len(report['recommendations'])} 个重新匹配建议")
        print(f"- 发现了 {len(report['warnings'])} 个警告")
        
        return report
        
    except Exception as e:
        print(f"处理过程出错: {e}")
        import traceback
        traceback.print_exc()
        return None

if __name__ == "__main__":
    main()