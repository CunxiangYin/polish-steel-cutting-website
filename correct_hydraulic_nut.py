#!/usr/bin/env python3
"""
使用正确的液压螺母图片进行替换
"""

import os
import json
from PIL import Image

def find_correct_hydraulic_nut_image():
    """查找正确的液压螺母图片"""
    
    base_dir = "/Users/jasonyin/project/electromechanical-landing"
    extracted_dir = os.path.join(base_dir, "extracted_images")
    info_file = os.path.join(extracted_dir, "extracted_images_info.json")
    
    with open(info_file, 'r', encoding='utf-8') as f:
        all_images = json.load(f)
    
    print("=== 查找液压螺母的正确图片 ===")
    print("根据用户提供的信息，正确的液压螺母应该是圆形的金属紧固件")
    
    # 分析所有图片，寻找圆形金属部件的特征
    candidates = []
    
    for img_info in all_images:
        filename = img_info['filename']
        width = img_info['width']
        height = img_info['height']
        source = img_info['source']
        
        # 计算图片特征
        aspect_ratio = width / height if height > 0 else 1
        is_round_ish = 0.8 <= aspect_ratio <= 1.25  # 接近圆形/正方形
        is_medium_size = 200 <= min(width, height) <= 600  # 中等尺寸
        
        # 查看图片文件实际内容来分析
        img_path = os.path.join(extracted_dir, filename)
        
        if os.path.exists(img_path):
            try:
                with Image.open(img_path) as img:
                    # 分析图片的复杂度（颜色数量等）
                    colors = img.getcolors(maxcolors=256*256*256)
                    color_count = len(colors) if colors else 0
                    
                    # 金属部件通常有较多灰色调
                    is_metallic = color_count > 50  # 金属表面有丰富的色彩层次
                    
                    score = 0
                    reasons = []
                    
                    if is_round_ish:
                        score += 2
                        reasons.append("接近圆形比例")
                    
                    if is_medium_size:
                        score += 1
                        reasons.append("合适的尺寸")
                    
                    if is_metallic:
                        score += 1
                        reasons.append("金属质感")
                    
                    # 特别查找可能的液压螺母特征
                    if source == 'pdf':
                        score += 1
                        reasons.append("PDF技术文档来源")
                    
                    if score >= 3:
                        candidates.append({
                            'filename': filename,
                            'score': score,
                            'reasons': reasons,
                            'width': width,
                            'height': height,
                            'aspect_ratio': round(aspect_ratio, 2),
                            'source': source,
                            'page': img_info.get('page', 'N/A'),
                            'color_complexity': color_count
                        })
                        
                        print(f"候选: {filename}")
                        print(f"  尺寸: {width}x{height} (比例: {aspect_ratio:.2f})")
                        print(f"  得分: {score} 分")
                        print(f"  颜色复杂度: {color_count}")
                        print(f"  优势: {', '.join(reasons)}")
                        if source == 'pdf':
                            print(f"  PDF页面: {img_info.get('page', 'N/A')}")
                        print()
                        
            except Exception as e:
                print(f"无法分析图片 {filename}: {e}")
                continue
    
    # 按得分和特征排序
    candidates.sort(key=lambda x: (x['score'], x['color_complexity']), reverse=True)
    
    return candidates

def inspect_specific_images():
    """检查特定的图片以寻找液压螺母"""
    
    base_dir = "/Users/jasonyin/project/electromechanical-landing"
    extracted_dir = os.path.join(base_dir, "extracted_images")
    
    # 根据用户描述，液压螺母应该在PDF文档中，并且是圆形金属部件
    # 让我们检查PDF中可能包含圆形金属部件的图片
    
    likely_candidates = [
        "pdf_page_6_img_4.png",  # 181x171，接近正方形
        "pdf_page_7_img_1.png",  # 200x152
        "pdf_page_6_img_1.png",  # 140x119，小尺寸
        "pdf_page_4_img_3.png",  # 140x115，小尺寸
        "pdf_page_6_img_5.png",  # 140x115，小尺寸
    ]
    
    print("=== 检查最有可能的候选图片 ===")
    
    for filename in likely_candidates:
        img_path = os.path.join(extracted_dir, filename)
        if os.path.exists(img_path):
            print(f"检查: {filename}")
            try:
                with Image.open(img_path) as img:
                    print(f"  尺寸: {img.size}")
                    print(f"  模式: {img.mode}")
                    
                    # 简单的色彩分析
                    colors = img.getcolors(maxcolors=256*256*256)
                    if colors:
                        print(f"  颜色种类: {len(colors)}")
                        # 获取主要颜色
                        dominant_colors = sorted(colors, key=lambda x: x[0], reverse=True)[:5]
                        print(f"  主要颜色: {[color[1] if len(color) > 1 else 'N/A' for color in dominant_colors[:3]]}")
                    
            except Exception as e:
                print(f"  分析失败: {e}")
            print()

def replace_with_best_candidate():
    """使用最佳候选替换液压螺母图片"""
    
    candidates = find_correct_hydraulic_nut_image()
    inspect_specific_images()
    
    if not candidates:
        print("❌ 未找到合适的候选图片")
        return False
    
    print(f"=== 选择最佳候选 ===")
    best_candidate = candidates[0]
    
    print(f"选择: {best_candidate['filename']}")
    print(f"理由: 得分最高 ({best_candidate['score']} 分)")
    print(f"特征: {', '.join(best_candidate['reasons'])}")
    
    # 执行替换
    base_dir = "/Users/jasonyin/project/electromechanical-landing"
    extracted_dir = os.path.join(base_dir, "extracted_images")
    website_dir = os.path.join(base_dir, "new-website")
    target_dir = os.path.join(website_dir, "public", "images", "products")
    
    source_path = os.path.join(extracted_dir, best_candidate['filename'])
    target_path = os.path.join(target_dir, "hydraulic-nut.jpeg")
    
    try:
        with Image.open(source_path) as img:
            # 转换为RGB并优化
            if img.mode in ('RGBA', 'LA', 'P'):
                background = Image.new('RGB', img.size, (255, 255, 255))
                if img.mode == 'P':
                    img = img.convert('RGBA')
                if img.mode in ('RGBA', 'LA'):
                    background.paste(img, mask=img.split()[-1] if img.mode == 'RGBA' else None)
                img = background
            elif img.mode not in ('RGB', 'L'):
                img = img.convert('RGB')
            
            # 保存
            img.save(target_path, 'JPEG', quality=85, optimize=True)
        
        # 更新映射文件
        mapping_file = os.path.join(website_dir, "src", "data", "product-images-mapping.json")
        
        if os.path.exists(mapping_file):
            with open(mapping_file, 'r', encoding='utf-8') as f:
                mapping = json.load(f)
            
            mapping['hydraulic-nut']['original_source'] = best_candidate['filename']
            mapping['hydraulic-nut']['quality_score'] = best_candidate['score'] * 2  # 基于分析得分
            
            with open(mapping_file, 'w', encoding='utf-8') as f:
                json.dump(mapping, f, ensure_ascii=False, indent=2)
        
        print(f"✅ 成功替换液压螺母图片!")
        print(f"新图片: {best_candidate['filename']}")
        return True
        
    except Exception as e:
        print(f"❌ 替换失败: {e}")
        return False

def main():
    """主函数"""
    print("=== 修正液压螺母图片匹配 ===")
    print("根据用户指出的错误，重新选择正确的液压螺母图片")
    print()
    
    success = replace_with_best_candidate()
    
    if success:
        print(f"\n✅ 液压螺母图片已更新!")
        print(f"请运行以下命令部署:")
        print(f"npm run build && netlify deploy --prod")
    else:
        print(f"\n❌ 更新失败，可能需要手动选择图片")

if __name__ == "__main__":
    main()