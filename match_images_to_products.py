#!/usr/bin/env python3
"""
图片产品匹配脚本 - 将提取的图片与产品数据库对应
"""

import os
import json
import shutil
from pathlib import Path

def load_extracted_images(info_file):
    """加载提取的图片信息"""
    with open(info_file, 'r', encoding='utf-8') as f:
        return json.load(f)

def load_product_database():
    """模拟产品数据库"""
    return [
        {
            "id": "taiwan-yunghua-cutting-line",
            "name": "台湾荣华钢材裁切生产线",
            "nameEn": "Taiwan Yunghua Steel Cutting Production Line",
            "category": "钢材切割设备",
            "keywords": ["荣华", "裁切", "生产线", "钢材", "taiwan", "yunghua", "cutting"],
            "suggested_images": []
        },
        {
            "id": "steel-coil-cart",
            "name": "钢卷移动台车",
            "nameEn": "Steel Coil Mobile Cart",
            "category": "周边设备",
            "keywords": ["钢卷", "台车", "移动", "coil", "cart", "mobile"],
            "suggested_images": []
        },
        {
            "id": "mechanical-coil-flipper", 
            "name": "机械式钢卷翻倒机",
            "nameEn": "Mechanical Steel Coil Flipper",
            "category": "周边设备",
            "keywords": ["翻倒机", "机械", "钢卷", "flipper", "mechanical", "coil"],
            "suggested_images": []
        },
        {
            "id": "steel-strip-cutter",
            "name": "钢带剪断机", 
            "nameEn": "Steel Strip Cutting Machine",
            "category": "周边设备",
            "keywords": ["剪断机", "钢带", "切断", "cutter", "strip", "cutting"],
            "suggested_images": []
        },
        {
            "id": "jdc-belt-tensioner",
            "name": "日本JDC皮带张紧器",
            "nameEn": "Japan JDC Belt Tensioner",
            "category": "专用配件",
            "keywords": ["JDC", "皮带", "张紧器", "日本", "belt", "tensioner", "japan"],
            "suggested_images": []
        },
        {
            "id": "hydraulic-nut",
            "name": "液压螺母",
            "nameEn": "Hydraulic Nut", 
            "category": "专用配件",
            "keywords": ["液压", "螺母", "hydraulic", "nut"],
            "suggested_images": []
        }
    ]

def analyze_image_quality(image_info):
    """分析图片质量和适用性"""
    width = image_info['width']
    height = image_info['height']
    
    # 计算质量分数
    resolution_score = min(width * height / 100000, 10)  # 分辨率分数
    aspect_ratio = width / height if height > 0 else 1
    aspect_score = 10 if 0.5 <= aspect_ratio <= 2.0 else 5  # 适宜的宽高比
    
    # 尺寸偏好分数
    size_score = 10
    if width < 200 or height < 200:
        size_score = 3  # 太小
    elif width > 2000 or height > 2000:
        size_score = 7  # 太大但可用
    
    total_score = (resolution_score + aspect_score + size_score) / 3
    return {
        'score': total_score,
        'resolution_score': resolution_score,
        'aspect_score': aspect_score, 
        'size_score': size_score,
        'suitable': total_score >= 6
    }

def categorize_images_by_source(images):
    """按来源对图片进行分类"""
    pdf_images = []
    pptx_images = []
    
    for img in images:
        quality = analyze_image_quality(img)
        img['quality_analysis'] = quality
        
        if img['source'] == 'pdf':
            pdf_images.append(img)
        elif img['source'] == 'pptx':
            pptx_images.append(img)
    
    # 按质量排序
    pdf_images.sort(key=lambda x: x['quality_analysis']['score'], reverse=True)
    pptx_images.sort(key=lambda x: x['quality_analysis']['score'], reverse=True)
    
    return pdf_images, pptx_images

def suggest_image_product_matching(pdf_images, pptx_images, products):
    """建议图片和产品的匹配关系"""
    
    # 筛选高质量图片
    high_quality_pdf = [img for img in pdf_images if img['quality_analysis']['suitable']]
    high_quality_pptx = [img for img in pptx_images if img['quality_analysis']['suitable']]
    
    print(f"高质量PDF图片: {len(high_quality_pdf)} 张")
    print(f"高质量PPTX图片: {len(high_quality_pptx)} 张")
    
    # 智能分配策略
    suggestions = []
    
    # 主要产品使用最好的图片
    main_products = ['taiwan-yunghua-cutting-line']
    for product_id in main_products:
        product = next((p for p in products if p['id'] == product_id), None)
        if product and high_quality_pptx:
            best_img = high_quality_pptx[0]
            suggestions.append({
                'product_id': product_id,
                'product_name': product['name'],
                'image_file': best_img['filename'],
                'image_source': best_img['source'],
                'quality_score': best_img['quality_analysis']['score'],
                'reason': '主要产品配最高质量图片'
            })
            high_quality_pptx.pop(0)
    
    # 周边设备使用中等质量图片
    peripheral_products = ['steel-coil-cart', 'mechanical-coil-flipper', 'steel-strip-cutter']
    available_images = high_quality_pptx + high_quality_pdf
    
    for i, product_id in enumerate(peripheral_products):
        product = next((p for p in products if p['id'] == product_id), None)
        if product and i < len(available_images):
            img = available_images[i]
            suggestions.append({
                'product_id': product_id,
                'product_name': product['name'],
                'image_file': img['filename'],
                'image_source': img['source'],
                'quality_score': img['quality_analysis']['score'],
                'reason': '周边设备配置图片'
            })
    
    # 专用配件使用剩余图片
    parts_products = ['jdc-belt-tensioner', 'hydraulic-nut']
    remaining_images = available_images[len(peripheral_products):]
    
    for i, product_id in enumerate(parts_products):
        product = next((p for p in products if p['id'] == product_id), None)
        if product and i < len(remaining_images):
            img = remaining_images[i]
            suggestions.append({
                'product_id': product_id,
                'product_name': product['name'],
                'image_file': img['filename'],
                'image_source': img['source'],
                'quality_score': img['quality_analysis']['score'],
                'reason': '专用配件配置图片'
            })
    
    return suggestions

def copy_images_to_website(suggestions, source_dir, target_dir):
    """将选定的图片复制到网站目录"""
    Path(target_dir).mkdir(parents=True, exist_ok=True)
    
    copied_images = []
    
    for suggestion in suggestions:
        source_file = os.path.join(source_dir, suggestion['image_file'])
        
        # 生成新的文件名
        file_ext = Path(suggestion['image_file']).suffix.lower()
        if file_ext not in ['.jpg', '.jpeg']:
            file_ext = '.jpg'  # 统一转换为jpg
        
        new_filename = f"{suggestion['product_id']}{file_ext}"
        target_file = os.path.join(target_dir, new_filename)
        
        try:
            shutil.copy2(source_file, target_file)
            copied_images.append({
                'product_id': suggestion['product_id'],
                'original_file': suggestion['image_file'],
                'new_filename': new_filename,
                'target_path': target_file,
                'quality_score': suggestion['quality_score']
            })
            print(f"复制: {suggestion['image_file']} -> {new_filename}")
            
        except Exception as e:
            print(f"复制失败 {suggestion['image_file']}: {e}")
    
    return copied_images

def generate_image_mapping_file(copied_images, output_file):
    """生成图片映射文件供网站使用"""
    mapping = {}
    
    for img in copied_images:
        mapping[img['product_id']] = {
            'filename': img['new_filename'],
            'path': f"/images/products/{img['new_filename']}",
            'quality_score': img['quality_score'],
            'original_source': img['original_file']
        }
    
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(mapping, f, ensure_ascii=False, indent=2)
    
    print(f"图片映射文件已生成: {output_file}")
    return mapping

def main():
    """主函数"""
    print("=== 图片产品匹配工具 ===")
    
    # 设置路径
    base_dir = "/Users/jasonyin/project/electromechanical-landing"
    extracted_dir = os.path.join(base_dir, "extracted_images")
    info_file = os.path.join(extracted_dir, "extracted_images_info.json")
    website_dir = os.path.join(base_dir, "new-website")
    images_dir = os.path.join(website_dir, "public", "images", "products")
    mapping_file = os.path.join(website_dir, "src", "data", "product-images-mapping.json")
    
    # 加载数据
    print("加载提取的图片信息...")
    images = load_extracted_images(info_file)
    
    print("加载产品数据库...")
    products = load_product_database()
    
    print(f"总图片数量: {len(images)}")
    print(f"产品数量: {len(products)}")
    
    # 分析图片质量
    print("\n分析图片质量...")
    pdf_images, pptx_images = categorize_images_by_source(images)
    
    # 生成匹配建议
    print("\n生成匹配建议...")
    suggestions = suggest_image_product_matching(pdf_images, pptx_images, products)
    
    print(f"\n生成了 {len(suggestions)} 个匹配建议:")
    for suggestion in suggestions:
        print(f"  {suggestion['product_name']}: {suggestion['image_file']} (质量分数: {suggestion['quality_score']:.1f})")
    
    # 复制图片到网站目录
    print(f"\n复制图片到网站目录: {images_dir}")
    copied_images = copy_images_to_website(suggestions, extracted_dir, images_dir)
    
    # 生成映射文件
    print(f"\n生成图片映射文件...")
    mapping = generate_image_mapping_file(copied_images, mapping_file)
    
    print(f"\n完成! 成功处理了 {len(copied_images)} 张产品图片")
    print(f"图片目录: {images_dir}")
    print(f"映射文件: {mapping_file}")
    
    return mapping

if __name__ == "__main__":
    try:
        main()
    except Exception as e:
        print(f"程序出错: {e}")
        import traceback
        traceback.print_exc()