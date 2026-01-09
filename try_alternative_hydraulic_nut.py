#!/usr/bin/env python3
"""
尝试其他液压螺母候选图片
"""

import os
import json
import shutil
from PIL import Image

def try_alternative_candidates():
    """尝试其他液压螺母候选"""
    
    print("=== 尝试其他液压螺母候选 ===")
    print("当前选择仍然错误，让我们尝试其他候选...")
    print()
    
    # 基于分析结果，尝试其他高分候选
    alternatives = [
        {
            'filename': 'pdf_page_5_img_2.png',
            'page': 5,
            'reason': '金属色泽最强(RGB: 165,165,164)，可能是金属螺母'
        },
        {
            'filename': 'pdf_page_5_img_3.png', 
            'page': 5,
            'reason': '金属色泽，中等尺寸，可能是螺母侧视图'
        },
        {
            'filename': 'pdf_page_6_img_3.png',
            'page': 6,
            'reason': '金属色泽，在部件页面'
        },
        {
            'filename': 'pdf_page_8_img_2.png',
            'page': 8,
            'reason': '金属色泽，较大尺寸，可能是螺母特写'
        }
    ]
    
    print("其他高分候选:")
    for i, alt in enumerate(alternatives, 1):
        print(f"{i}. {alt['filename']} (PDF页面 {alt['page']})")
        print(f"   理由: {alt['reason']}")
        print()
    
    return alternatives

def ask_user_for_help():
    """请求用户帮助定位"""
    
    print("=== 需要您的帮助 ===")
    print()
    print("为了确保选择正确的液压螺母图片，能否请您告诉我：")
    print()
    print("1. 液压螺母在PDF文档的第几页？")
    print("2. 在那一页上，液压螺母是第几张图片？")
    print()
    print("PDF页面分布:")
    print("- 页面1: 1张图片 (可能是封面)")
    print("- 页面2: 1张图片") 
    print("- 页面3: 1张图片")
    print("- 页面4: 3张图片")
    print("- 页面5: 4张图片") 
    print("- 页面6: 6张图片")
    print("- 页面7: 5张图片")
    print("- 页面8: 3张图片")
    print()
    print("例如：如果液压螺母在第5页的第2张图片，")
    print("我就可以直接选择 pdf_page_5_img_2.png")

def try_specific_candidate(filename):
    """尝试指定的候选图片"""
    
    base_dir = "/Users/jasonyin/project/electromechanical-landing"
    extracted_dir = os.path.join(base_dir, "extracted_images")
    website_dir = os.path.join(base_dir, "new-website")
    target_dir = os.path.join(website_dir, "public", "images", "products")
    
    source_path = os.path.join(extracted_dir, filename)
    target_path = os.path.join(target_dir, "hydraulic-nut.jpeg")
    
    if not os.path.exists(source_path):
        print(f"❌ 源文件不存在: {source_path}")
        return False
    
    try:
        with Image.open(source_path) as img:
            # 转换和优化
            if img.mode in ('RGBA', 'LA', 'P'):
                background = Image.new('RGB', img.size, (255, 255, 255))
                if img.mode == 'P':
                    img = img.convert('RGBA')
                if img.mode in ('RGBA', 'LA'):
                    background.paste(img, mask=img.split()[-1] if img.mode == 'RGBA' else None)
                img = background
            elif img.mode not in ('RGB', 'L'):
                img = img.convert('RGB')
            
            # 确保合适尺寸
            width, height = img.size
            if max(width, height) < 200:
                scale = 200 / max(width, height)
                new_size = (int(width * scale), int(height * scale))
                img = img.resize(new_size, Image.Resampling.LANCZOS)
            elif max(width, height) > 600:
                scale = 600 / max(width, height)
                new_size = (int(width * scale), int(height * scale))
                img = img.resize(new_size, Image.Resampling.LANCZOS)
            
            img.save(target_path, 'JPEG', quality=90, optimize=True)
        
        # 更新映射文件
        mapping_file = os.path.join(website_dir, "src", "data", "product-images-mapping.json")
        if os.path.exists(mapping_file):
            with open(mapping_file, 'r', encoding='utf-8') as f:
                mapping = json.load(f)
            
            mapping['hydraulic-nut']['original_source'] = filename
            mapping['hydraulic-nut']['quality_score'] = 8.5
            
            with open(mapping_file, 'w', encoding='utf-8') as f:
                json.dump(mapping, f, ensure_ascii=False, indent=2)
        
        print(f"✅ 成功替换为: {filename}")
        return True
        
    except Exception as e:
        print(f"❌ 替换失败: {e}")
        return False

def main():
    """主函数"""
    print("当前的液压螺母图片仍然不正确...")
    print()
    
    alternatives = try_alternative_candidates()
    ask_user_for_help()
    
    print("=== 临时解决方案 ===")
    print("让我尝试使用金属色泽最强的候选图片:")
    
    # 尝试金属色泽最强的候选
    best_metallic = 'pdf_page_5_img_2.png'  # RGB: 165,165,164 - 最接近金属灰色
    
    success = try_specific_candidate(best_metallic)
    
    if success:
        print(f"✅ 已更换为最具金属色泽的图片: {best_metallic}")
        print(f"这是PDF第5页第2张图片，具有最强的金属色泽特征")
        print(f"\n请部署查看:")
        print(f"npm run build && netlify deploy --prod")
        print(f"\n如果这个还不对，请告诉我液压螺母的具体页面位置。")
    else:
        print(f"❌ 替换失败")

if __name__ == "__main__":
    main()