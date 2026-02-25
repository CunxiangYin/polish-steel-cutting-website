#!/usr/bin/env python3
"""
图片内容验证脚本 - 验证图片与产品信息的匹配度
"""

import os
import json
from PIL import Image
import matplotlib.pyplot as plt
import matplotlib.patches as patches

def load_product_info():
    """加载产品信息"""
    products = {
        "taiwan-yunghua-cutting-line": {
            "name": "台湾荣华钢材裁切生产线",
            "name_en": "Taiwan Yunghua Steel Cutting Production Line",
            "description": "专业设计、生产金属裁片机及分条机，产品遍及世界各地，六十年来，精益求精",
            "keywords": ["钢材", "裁切", "生产线", "分条机", "金属", "台湾荣华"]
        },
        "steel-coil-cart": {
            "name": "钢卷移动台车",
            "name_en": "Steel Coil Mobile Cart", 
            "description": "用于运载宽幅钢卷，设备运行平稳，噪音低。台车设置安全装置",
            "keywords": ["钢卷", "台车", "移动", "运载", "安全装置"]
        },
        "mechanical-coil-flipper": {
            "name": "机械式钢卷翻倒机",
            "name_en": "Mechanical Steel Coil Flipper",
            "description": "采用齿条或摩擦轮式，不占空间，不动基础。翻转平稳、安全",
            "keywords": ["翻倒机", "机械", "钢卷", "齿条", "摩擦轮", "翻转"]
        },
        "steel-strip-cutter": {
            "name": "钢带剪断机",
            "name_en": "Steel Strip Cutting Machine",
            "description": "切断尺寸准确，平直度良好。作业简单，剪切长度任意设定",
            "keywords": ["剪断机", "钢带", "切断", "剪切", "精密"]
        },
        "jdc-belt-tensioner": {
            "name": "日本JDC皮带张紧器",
            "name_en": "Japan JDC Belt Tensioner",
            "description": "皮带张紧器是日本JDC公司的专利高技术产品。增加卷紧张力",
            "keywords": ["JDC", "皮带", "张紧器", "日本", "专利", "卷紧"]
        },
        "hydraulic-nut": {
            "name": "液压螺母",
            "name_en": "Hydraulic Nut",
            "description": "用途：金属分条机圆刀紧固夹具。能达到20-30吨的轴向锁紧力",
            "keywords": ["液压", "螺母", "圆刀", "紧固", "夹具", "分条机"]
        }
    }
    return products

def display_images_with_info():
    """显示图片及其对应的产品信息"""
    
    base_dir = "/Users/jasonyin/project/electromechanical-landing"
    images_dir = os.path.join(base_dir, "new-website", "public", "images", "products")
    mapping_file = os.path.join(base_dir, "new-website", "src", "data", "product-images-mapping.json")
    
    # 加载映射信息
    with open(mapping_file, 'r', encoding='utf-8') as f:
        mapping = json.load(f)
    
    # 加载产品信息
    products = load_product_info()
    
    print("=== 图片与产品信息验证 ===")
    print("请检查以下图片是否与产品描述匹配：\n")
    
    # 创建验证报告
    verification_report = []
    
    for product_id, image_info in mapping.items():
        image_path = os.path.join(images_dir, image_info['filename'])
        product_info = products.get(product_id, {})
        
        print(f"{'='*60}")
        print(f"产品ID: {product_id}")
        print(f"产品名称: {product_info.get('name', 'N/A')}")
        print(f"英文名称: {product_info.get('name_en', 'N/A')}")
        print(f"产品描述: {product_info.get('description', 'N/A')}")
        print(f"关键词: {', '.join(product_info.get('keywords', []))}")
        print(f"图片文件: {image_info['filename']}")
        print(f"原始来源: {image_info['original_source']}")
        print(f"图片路径: {image_path}")
        
        if os.path.exists(image_path):
            try:
                with Image.open(image_path) as img:
                    print(f"图片尺寸: {img.size}")
                    print(f"图片格式: {img.format}")
                    
                    # 添加到验证报告
                    verification_report.append({
                        'product_id': product_id,
                        'product_name': product_info.get('name', ''),
                        'image_file': image_info['filename'],
                        'image_exists': True,
                        'image_size': img.size,
                        'needs_verification': True,
                        'keywords': product_info.get('keywords', [])
                    })
                    
            except Exception as e:
                print(f"无法打开图片: {e}")
                verification_report.append({
                    'product_id': product_id,
                    'product_name': product_info.get('name', ''),
                    'image_file': image_info['filename'],
                    'image_exists': False,
                    'error': str(e)
                })
        else:
            print(f"图片文件不存在: {image_path}")
            verification_report.append({
                'product_id': product_id,
                'product_name': product_info.get('name', ''),
                'image_file': image_info['filename'],
                'image_exists': False
            })
        
        print()
    
    # 保存验证报告
    report_file = os.path.join(base_dir, "image_verification_report.json")
    with open(report_file, 'w', encoding='utf-8') as f:
        json.dump(verification_report, f, ensure_ascii=False, indent=2)
    
    print(f"验证报告已保存到: {report_file}")
    
    # 生成检查清单
    print("\n=== 人工验证检查清单 ===")
    print("请检查以下问题：")
    print("1. taiwan-yunghua-cutting-line.jpeg 是否显示钢材裁切设备/生产线？")
    print("2. steel-coil-cart.jpeg 是否显示钢卷运输台车？")
    print("3. mechanical-coil-flipper.jpeg 是否显示钢卷翻倒设备？")
    print("4. steel-strip-cutter.jpeg 是否显示钢带切割/剪断设备？")
    print("5. jdc-belt-tensioner.jpeg 是否显示皮带张紧器相关设备？")
    print("6. hydraulic-nut.jpeg 是否显示液压螺母或相关紧固件？")
    
    return verification_report

def suggest_reordering():
    """根据常见的设备外观特征建议重新匹配"""
    
    print("\n=== 重新匹配建议 ===")
    print("如果发现图片与产品不匹配，请考虑以下重新匹配策略：")
    print()
    print("设备识别要点：")
    print("• 大型钢材裁切生产线：通常有长条形工作台、切割刀具、钢材导轨")
    print("• 钢卷移动台车：轮式设备，用于承载圆形钢卷，有支撑结构")
    print("• 机械式翻倒机：有翻转机构，用于钢卷换向，通常有臂架结构")
    print("• 钢带剪断机：较小型设备，有剪切刀具，用于切断钢带")
    print("• 皮带张紧器：相对较小的部件，用于皮带系统")
    print("• 液压螺母：更小的紧固件，通常是机械部件")
    print()
    print("如需重新匹配，请告诉我正确的对应关系。")

def main():
    """主函数"""
    try:
        report = display_images_with_info()
        suggest_reordering()
        
        print(f"\n总结:")
        print(f"- 检查了 {len(report)} 个产品的图片匹配")
        print(f"- 请人工验证每张图片内容是否与产品描述一致")
        print(f"- 如发现不匹配，请提供正确的对应关系")
        
        return report
        
    except Exception as e:
        print(f"验证过程出错: {e}")
        import traceback
        traceback.print_exc()
        return None

if __name__ == "__main__":
    main()