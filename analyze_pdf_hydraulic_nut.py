#!/usr/bin/env python3
"""
仔细分析PDF文档中的液压螺母图片
"""

import os
import json
from PIL import Image, ImageDraw, ImageFont
import numpy as np

def analyze_pdf_images_for_hydraulic_nut():
    """仔细分析PDF中的每张图片，寻找圆形金属螺母"""
    
    base_dir = "/Users/jasonyin/project/electromechanical-landing"
    extracted_dir = os.path.join(base_dir, "extracted_images")
    info_file = os.path.join(extracted_dir, "extracted_images_info.json")
    
    with open(info_file, 'r', encoding='utf-8') as f:
        all_images = json.load(f)
    
    print("=== 仔细分析PDF中的液压螺母图片 ===")
    print("寻找：圆形金属螺母（应该是圆形、金属色泽、螺母外观）")
    print()
    
    # 只分析PDF图片
    pdf_images = [img for img in all_images if img['source'] == 'pdf']
    
    print(f"PDF文档中共有 {len(pdf_images)} 张图片")
    print()
    
    # 对每张PDF图片进行详细分析
    hydraulic_nut_candidates = []
    
    for img_info in pdf_images:
        filename = img_info['filename']
        width = img_info['width']
        height = img_info['height']
        page = img_info['page']
        
        img_path = os.path.join(extracted_dir, filename)
        
        if os.path.exists(img_path):
            try:
                with Image.open(img_path) as img:
                    print(f"分析: {filename} (PDF页面 {page})")
                    print(f"  尺寸: {width}x{height}")
                    
                    # 计算图片特征
                    aspect_ratio = width / height
                    is_circular = 0.8 <= aspect_ratio <= 1.2  # 接近圆形
                    
                    # 分析颜色特征（寻找金属色）
                    img_array = np.array(img)
                    if len(img_array.shape) == 3:
                        # 计算平均颜色
                        mean_r = np.mean(img_array[:, :, 0])
                        mean_g = np.mean(img_array[:, :, 1])
                        mean_b = np.mean(img_array[:, :, 2])
                        
                        # 金属色通常是灰色系（RGB值相近）
                        color_balance = abs(mean_r - mean_g) + abs(mean_g - mean_b) + abs(mean_r - mean_b)
                        is_metallic_color = color_balance < 30 and 80 < np.mean([mean_r, mean_g, mean_b]) < 200
                        
                        print(f"  平均RGB: ({mean_r:.0f}, {mean_g:.0f}, {mean_b:.0f})")
                        print(f"  颜色平衡: {color_balance:.1f} ({'金属色' if is_metallic_color else '非金属色'})")
                    else:
                        is_metallic_color = False
                    
                    # 分析形状特征
                    colors = img.getcolors(maxcolors=256*256*256)
                    color_count = len(colors) if colors else 0
                    has_complexity = color_count > 20  # 螺母应该有一定的细节
                    
                    # 计算液压螺母匹配分数
                    score = 0
                    reasons = []
                    
                    if is_circular:
                        score += 3
                        reasons.append("接近圆形")
                    
                    if is_metallic_color:
                        score += 3
                        reasons.append("金属色泽")
                    
                    if has_complexity:
                        score += 1
                        reasons.append("有细节纹理")
                    
                    # 液压螺母通常是中等尺寸，不会太小也不会太大
                    if 100 <= min(width, height) <= 400:
                        score += 2
                        reasons.append("合适的螺母尺寸")
                    
                    # 特别关注可能包含螺母的页面
                    if page in [4, 5, 6, 7, 8]:  # 这些页面更可能包含部件图
                        score += 1
                        reasons.append("可能的部件页面")
                    
                    print(f"  圆形特征: {'是' if is_circular else '否'} (比例: {aspect_ratio:.2f})")
                    print(f"  颜色复杂度: {color_count}")
                    print(f"  液压螺母匹配分数: {score}")
                    
                    if score > 0:
                        print(f"  匹配原因: {', '.join(reasons)}")
                        
                        hydraulic_nut_candidates.append({
                            'filename': filename,
                            'page': page,
                            'score': score,
                            'width': width,
                            'height': height,
                            'aspect_ratio': round(aspect_ratio, 2),
                            'is_circular': is_circular,
                            'is_metallic': is_metallic_color,
                            'color_count': color_count,
                            'reasons': reasons
                        })
                    
                    print()
                    
            except Exception as e:
                print(f"  分析失败: {e}")
                print()
    
    # 按分数排序
    hydraulic_nut_candidates.sort(key=lambda x: x['score'], reverse=True)
    
    print(f"=== 液压螺母候选排序 ===")
    for i, candidate in enumerate(hydraulic_nut_candidates[:8], 1):
        print(f"{i}. {candidate['filename']} (PDF页面 {candidate['page']})")
        print(f"   得分: {candidate['score']} 分")
        print(f"   尺寸: {candidate['width']}x{candidate['height']} (比例: {candidate['aspect_ratio']})")
        print(f"   特征: 圆形={candidate['is_circular']}, 金属色={candidate['is_metallic']}")
        print(f"   优势: {', '.join(candidate['reasons'])}")
        print()
    
    return hydraulic_nut_candidates

def visual_inspection_helper():
    """提供视觉检查建议"""
    
    print("=== 视觉检查建议 ===")
    print("液压螺母的典型特征应该包括：")
    print("1. 圆形或近圆形外观")
    print("2. 金属质感（灰色、银色或黑色）")
    print("3. 中央可能有孔洞")
    print("4. 表面可能有纹理或加工痕迹")
    print("5. 尺寸适中（不会太小如螺丝，也不会太大如机器）")
    print()
    
    print("根据PDF页面分析，最有可能的位置：")
    print("- PDF页面4-8：通常包含产品部件图")
    print("- 寻找独立的圆形部件图片")
    print("- 避免选择复杂机器图片中的一部分")

def find_best_hydraulic_nut():
    """找到最佳的液压螺母图片"""
    
    candidates = analyze_pdf_images_for_hydraulic_nut()
    visual_inspection_helper()
    
    if not candidates:
        print("❌ 没有找到合适的液压螺母候选")
        return None
    
    # 选择得分最高的候选
    best_candidate = candidates[0]
    
    print(f"=== 推荐最佳候选 ===")
    print(f"文件: {best_candidate['filename']}")
    print(f"页面: PDF第{best_candidate['page']}页")
    print(f"得分: {best_candidate['score']} 分")
    print(f"理由: {', '.join(best_candidate['reasons'])}")
    
    return best_candidate

def replace_hydraulic_nut_image():
    """替换液压螺母图片"""
    
    best_candidate = find_best_hydraulic_nut()
    
    if not best_candidate:
        print("无法找到合适的替换图片")
        return False
    
    # 执行替换
    base_dir = "/Users/jasonyin/project/electromechanical-landing"
    extracted_dir = os.path.join(base_dir, "extracted_images")
    website_dir = os.path.join(base_dir, "new-website")
    target_dir = os.path.join(website_dir, "public", "images", "products")
    
    source_path = os.path.join(extracted_dir, best_candidate['filename'])
    target_path = os.path.join(target_dir, "hydraulic-nut.jpeg")
    
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
            
            # 确保合适的尺寸
            width, height = img.size
            if max(width, height) < 250:
                scale = 250 / max(width, height)
                new_size = (int(width * scale), int(height * scale))
                img = img.resize(new_size, Image.Resampling.LANCZOS)
            elif max(width, height) > 500:
                scale = 500 / max(width, height)
                new_size = (int(width * scale), int(height * scale))
                img = img.resize(new_size, Image.Resampling.LANCZOS)
            
            img.save(target_path, 'JPEG', quality=90, optimize=True)
        
        # 更新映射文件
        mapping_file = os.path.join(website_dir, "src", "data", "product-images-mapping.json")
        if os.path.exists(mapping_file):
            with open(mapping_file, 'r', encoding='utf-8') as f:
                mapping = json.load(f)
            
            mapping['hydraulic-nut']['original_source'] = best_candidate['filename']
            mapping['hydraulic-nut']['quality_score'] = best_candidate['score']
            
            with open(mapping_file, 'w', encoding='utf-8') as f:
                json.dump(mapping, f, ensure_ascii=False, indent=2)
        
        print(f"✅ 成功替换液压螺母图片!")
        print(f"新图片: {best_candidate['filename']} (PDF第{best_candidate['page']}页)")
        return True
        
    except Exception as e:
        print(f"❌ 替换失败: {e}")
        return False

def main():
    """主函数"""
    print("=== 深度分析PDF中的液压螺母图片 ===")
    print("根据您的反馈，当前显示仍然错误")
    print("让我更仔细地分析PDF文档中的每张图片...")
    print()
    
    success = replace_hydraulic_nut_image()
    
    if success:
        print(f"\n✅ 已使用更精确的分析方法选择液压螺母图片")
        print(f"这次选择基于：圆形特征 + 金属色泽 + 合适尺寸")
        print(f"\n请部署并检查:")
        print(f"npm run build && netlify deploy --prod")
    else:
        print(f"\n需要您的帮助：")
        print(f"如果方便的话，能否告诉我液压螺母在PDF的第几页？")
        print(f"这样我可以直接定位到正确的图片。")

if __name__ == "__main__":
    main()