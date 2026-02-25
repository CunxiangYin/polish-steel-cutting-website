#!/usr/bin/env python3
"""
图片内容分析工具 - 分析图片特征以验证匹配准确性
"""

import os
import json
from PIL import Image, ImageDraw, ImageFont
import matplotlib.pyplot as plt
import matplotlib.image as mpimg

def analyze_image_content(image_path):
    """分析单张图片的基本特征"""
    try:
        with Image.open(image_path) as img:
            # 基本信息
            width, height = img.size
            mode = img.mode
            format_type = img.format
            
            # 计算图片的主要色彩
            colors = img.getcolors(maxcolors=256*256*256)
            if colors:
                # 获取最常见的颜色
                dominant_color = max(colors, key=lambda x: x[0])
                
            # 计算亮度分布
            if img.mode == 'RGB':
                r, g, b = img.split()
                # 简单亮度计算
                brightness_avg = sum([
                    sum(r.getdata()) / len(r.getdata()),
                    sum(g.getdata()) / len(g.getdata()), 
                    sum(b.getdata()) / len(b.getdata())
                ]) / 3
            else:
                brightness_avg = 128  # 默认值
            
            analysis = {
                'size': (width, height),
                'mode': mode,
                'format': format_type,
                'aspect_ratio': round(width / height, 2) if height > 0 else 0,
                'brightness_avg': round(brightness_avg, 2),
                'file_size': os.path.getsize(image_path),
                'is_landscape': width > height,
                'is_square': abs(width - height) < min(width, height) * 0.1,
                'is_large': width > 800 or height > 800
            }
            
            return analysis
            
    except Exception as e:
        return {'error': str(e)}

def create_image_analysis_report():
    """创建详细的图片分析报告"""
    
    base_dir = "/Users/jasonyin/project/electromechanical-landing"
    images_dir = os.path.join(base_dir, "new-website", "public", "images", "products")
    mapping_file = os.path.join(base_dir, "new-website", "src", "data", "product-images-mapping.json")
    
    # 加载映射信息
    with open(mapping_file, 'r', encoding='utf-8') as f:
        mapping = json.load(f)
    
    print("=== 图片内容分析报告 ===")
    print()
    
    analysis_results = {}
    
    for product_id, image_info in mapping.items():
        image_path = os.path.join(images_dir, image_info['filename'])
        
        print(f"分析: {product_id}")
        print(f"文件: {image_info['filename']}")
        
        if os.path.exists(image_path):
            analysis = analyze_image_content(image_path)
            analysis_results[product_id] = analysis
            
            if 'error' in analysis:
                print(f"错误: {analysis['error']}")
            else:
                print(f"尺寸: {analysis['size']} ({analysis['aspect_ratio']}:1)")
                print(f"格式: {analysis['format']} ({analysis['mode']})")
                print(f"文件大小: {analysis['file_size'] // 1024}KB")
                print(f"平均亮度: {analysis['brightness_avg']}")
                print(f"横向图片: {'是' if analysis['is_landscape'] else '否'}")
                print(f"大尺寸图片: {'是' if analysis['is_large'] else '否'}")
                
                # 基于特征推测内容类型
                if analysis['is_landscape'] and analysis['is_large']:
                    print("推测: 可能是大型设备或生产线的照片")
                elif not analysis['is_landscape'] and analysis['aspect_ratio'] < 1:
                    print("推测: 可能是竖向设备或部件的照片")
                elif analysis['is_square'] or abs(analysis['aspect_ratio'] - 1) < 0.2:
                    print("推测: 可能是方形产品或特写照片")
                
        else:
            print(f"文件不存在: {image_path}")
            analysis_results[product_id] = {'error': 'File not found'}
        
        print("-" * 50)
    
    return analysis_results

def suggest_matching_improvements(analysis_results):
    """基于图片特征建议改进匹配"""
    
    print("\n=== 匹配建议分析 ===")
    
    # 产品类型期望特征
    expected_features = {
        "taiwan-yunghua-cutting-line": {
            "expected": "大型横向设备，工业环境背景",
            "features": ["is_landscape", "is_large"],
            "importance": "高"
        },
        "steel-coil-cart": {
            "expected": "移动设备，可能有轮子，承载钢卷", 
            "features": ["is_landscape"],
            "importance": "中"
        },
        "mechanical-coil-flipper": {
            "expected": "机械臂或翻转装置",
            "features": ["is_landscape"],
            "importance": "中"
        },
        "steel-strip-cutter": {
            "expected": "相对较小的切割设备",
            "features": [],
            "importance": "中"
        },
        "jdc-belt-tensioner": {
            "expected": "较小的机械部件",
            "features": [],
            "importance": "低"
        },
        "hydraulic-nut": {
            "expected": "小型紧固件或部件特写",
            "features": [],
            "importance": "低"
        }
    }
    
    matching_scores = {}
    
    for product_id, analysis in analysis_results.items():
        if 'error' in analysis:
            continue
            
        expected = expected_features.get(product_id, {})
        score = 0
        max_score = len(expected.get('features', []))
        
        # 检查期望特征
        for feature in expected.get('features', []):
            if analysis.get(feature, False):
                score += 1
        
        matching_scores[product_id] = {
            'score': score,
            'max_score': max_score,
            'percentage': round((score / max_score * 100) if max_score > 0 else 50, 1),
            'expected': expected.get('expected', ''),
            'importance': expected.get('importance', '中')
        }
        
        print(f"{product_id}:")
        print(f"  期望特征: {expected.get('expected', '无特殊要求')}")
        print(f"  匹配分数: {score}/{max_score} ({matching_scores[product_id]['percentage']}%)")
        print(f"  重要程度: {expected.get('importance', '中')}")
        print()
    
    # 找出可能的问题
    print("可能需要检查的匹配:")
    for product_id, score_info in matching_scores.items():
        if score_info['importance'] == '高' and score_info['percentage'] < 80:
            print(f"⚠️  {product_id}: 重要产品但特征匹配度较低 ({score_info['percentage']}%)")
        elif score_info['percentage'] == 0 and score_info['max_score'] > 0:
            print(f"❌ {product_id}: 特征完全不匹配")
    
    return matching_scores

def show_original_source_info():
    """显示原始图片来源信息"""
    
    base_dir = "/Users/jasonyin/project/electromechanical-landing" 
    mapping_file = os.path.join(base_dir, "new-website", "src", "data", "product-images-mapping.json")
    extracted_info_file = os.path.join(base_dir, "extracted_images", "extracted_images_info.json")
    
    with open(mapping_file, 'r', encoding='utf-8') as f:
        mapping = json.load(f)
    
    with open(extracted_info_file, 'r', encoding='utf-8') as f:
        extracted_info = json.load(f)
    
    print("\n=== 原始图片来源分析 ===")
    
    # 创建原始文件名到信息的映射
    original_info_map = {info['filename']: info for info in extracted_info}
    
    for product_id, image_info in mapping.items():
        original_source = image_info['original_source']
        source_info = original_info_map.get(original_source, {})
        
        print(f"{product_id}:")
        print(f"  当前图片: {image_info['filename']}")
        print(f"  原始来源: {original_source}")
        
        if source_info:
            print(f"  来源文档: {source_info.get('source', 'unknown')}")
            if source_info.get('source') == 'pptx':
                print(f"  PPT路径: {source_info.get('original_path', 'N/A')}")
            elif source_info.get('source') == 'pdf':
                print(f"  PDF页面: {source_info.get('page', 'N/A')}")
        print()

def main():
    """主函数"""
    print("开始图片内容分析...")
    
    try:
        # 分析图片特征
        analysis_results = create_image_analysis_report()
        
        # 建议匹配改进
        matching_scores = suggest_matching_improvements(analysis_results)
        
        # 显示来源信息
        show_original_source_info()
        
        # 保存分析结果
        report_file = "/Users/jasonyin/project/electromechanical-landing/detailed_image_analysis.json"
        with open(report_file, 'w', encoding='utf-8') as f:
            json.dump({
                'analysis_results': analysis_results,
                'matching_scores': matching_scores
            }, f, ensure_ascii=False, indent=2)
        
        print(f"\n详细分析报告已保存到: {report_file}")
        print("\n总结:")
        print("- 已分析所有产品图片的技术特征")
        print("- 提供了基于特征的匹配建议")
        print("- 建议人工查看图片内容确认匹配正确性")
        print("- 如发现不匹配，请告知正确的对应关系以便重新分配")
        
    except Exception as e:
        print(f"分析过程出错: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    main()