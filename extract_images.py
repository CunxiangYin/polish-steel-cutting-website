#!/usr/bin/env python3
"""
图片提取脚本 - 从PDF和PPT文档中提取产品图片
"""

import os
import sys
import zipfile
import fitz  # PyMuPDF
from PIL import Image
import io
import json
from pathlib import Path

# 安装依赖说明
DEPENDENCIES = """
需要安装以下依赖:
pip install PyMuPDF pillow python-pptx

使用方法:
python extract_images.py
"""

def ensure_output_dir(output_dir):
    """确保输出目录存在"""
    Path(output_dir).mkdir(parents=True, exist_ok=True)

def extract_images_from_pdf(pdf_path, output_dir):
    """从PDF中提取图片"""
    print(f"正在处理PDF文件: {pdf_path}")
    
    try:
        pdf_document = fitz.open(pdf_path)
        extracted_images = []
        
        for page_num in range(len(pdf_document)):
            page = pdf_document.load_page(page_num)
            image_list = page.get_images()
            
            print(f"页面 {page_num + 1}: 找到 {len(image_list)} 张图片")
            
            for img_index, img in enumerate(image_list):
                try:
                    xref = img[0]
                    pix = fitz.Pixmap(pdf_document, xref)
                    
                    if pix.n - pix.alpha < 4:  # GRAY or RGB
                        img_filename = f"pdf_page_{page_num + 1}_img_{img_index + 1}.png"
                        img_path = os.path.join(output_dir, img_filename)
                        
                        # 保存图片
                        pix.save(img_path)
                        
                        # 获取图片信息
                        img_info = {
                            'filename': img_filename,
                            'path': img_path,
                            'page': page_num + 1,
                            'width': pix.width,
                            'height': pix.height,
                            'source': 'pdf'
                        }
                        extracted_images.append(img_info)
                        print(f"  提取: {img_filename} ({pix.width}x{pix.height})")
                    
                    pix = None
                    
                except Exception as e:
                    print(f"  跳过图片 {img_index}: {e}")
                    continue
        
        pdf_document.close()
        return extracted_images
        
    except Exception as e:
        print(f"处理PDF时出错: {e}")
        return []

def extract_images_from_pptx_zip(pptx_path, output_dir):
    """通过解压缩方法从PPTX中提取图片"""
    print(f"正在处理PPTX文件: {pptx_path}")
    
    try:
        extracted_images = []
        
        with zipfile.ZipFile(pptx_path, 'r') as zip_ref:
            # 获取所有文件列表
            file_list = zip_ref.namelist()
            media_files = [f for f in file_list if f.startswith('ppt/media/')]
            
            print(f"找到 {len(media_files)} 个媒体文件")
            
            for media_file in media_files:
                try:
                    # 获取文件扩展名
                    file_ext = os.path.splitext(media_file)[1].lower()
                    
                    # 只处理图片文件
                    if file_ext in ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.tiff']:
                        # 提取文件
                        file_data = zip_ref.read(media_file)
                        
                        # 生成新的文件名
                        original_name = os.path.basename(media_file)
                        img_filename = f"pptx_{original_name}"
                        img_path = os.path.join(output_dir, img_filename)
                        
                        # 保存文件
                        with open(img_path, 'wb') as f:
                            f.write(file_data)
                        
                        # 获取图片尺寸
                        try:
                            with Image.open(io.BytesIO(file_data)) as img:
                                width, height = img.size
                        except:
                            width, height = 0, 0
                        
                        # 保存图片信息
                        img_info = {
                            'filename': img_filename,
                            'path': img_path,
                            'original_path': media_file,
                            'width': width,
                            'height': height,
                            'source': 'pptx'
                        }
                        extracted_images.append(img_info)
                        print(f"  提取: {img_filename} ({width}x{height})")
                
                except Exception as e:
                    print(f"  跳过文件 {media_file}: {e}")
                    continue
        
        return extracted_images
        
    except Exception as e:
        print(f"处理PPTX时出错: {e}")
        return []

def optimize_image(img_path, max_width=800, max_height=600, quality=85):
    """优化图片尺寸和质量"""
    try:
        with Image.open(img_path) as img:
            # 转换为RGB模式（如果需要）
            if img.mode in ('RGBA', 'LA'):
                background = Image.new('RGB', img.size, (255, 255, 255))
                background.paste(img, mask=img.split()[-1] if img.mode == 'RGBA' else None)
                img = background
            elif img.mode not in ('RGB', 'L'):
                img = img.convert('RGB')
            
            # 计算新尺寸
            original_width, original_height = img.size
            ratio = min(max_width / original_width, max_height / original_height)
            
            if ratio < 1:
                new_width = int(original_width * ratio)
                new_height = int(original_height * ratio)
                img = img.resize((new_width, new_height), Image.Resampling.LANCZOS)
            
            # 保存优化后的图片
            img.save(img_path, 'JPEG', quality=quality, optimize=True)
            return True
            
    except Exception as e:
        print(f"优化图片失败 {img_path}: {e}")
        return False

def main():
    """主函数"""
    print("=== 普耐斯设备图片提取工具 ===")
    print(DEPENDENCIES)
    
    # 设置路径
    base_dir = "/Users/jasonyin/project/electromechanical-landing"
    pdf_path = os.path.join(base_dir, "普耐斯笔记本20111125(转曲）.pdf")
    pptx_path = os.path.join(base_dir, "商品推荐-2.pptx")
    output_dir = os.path.join(base_dir, "extracted_images")
    
    # 确保输出目录存在
    ensure_output_dir(output_dir)
    
    all_extracted_images = []
    
    # 提取PDF图片
    if os.path.exists(pdf_path):
        pdf_images = extract_images_from_pdf(pdf_path, output_dir)
        all_extracted_images.extend(pdf_images)
        print(f"从PDF提取了 {len(pdf_images)} 张图片")
    else:
        print(f"PDF文件不存在: {pdf_path}")
    
    # 提取PPTX图片
    if os.path.exists(pptx_path):
        pptx_images = extract_images_from_pptx_zip(pptx_path, output_dir)
        all_extracted_images.extend(pptx_images)
        print(f"从PPTX提取了 {len(pptx_images)} 张图片")
    else:
        print(f"PPTX文件不存在: {pptx_path}")
    
    # 优化所有图片
    print(f"\n正在优化 {len(all_extracted_images)} 张图片...")
    optimized_count = 0
    for img_info in all_extracted_images:
        if optimize_image(img_info['path']):
            optimized_count += 1
    
    print(f"成功优化了 {optimized_count} 张图片")
    
    # 保存图片信息到JSON文件
    info_file = os.path.join(output_dir, "extracted_images_info.json")
    with open(info_file, 'w', encoding='utf-8') as f:
        json.dump(all_extracted_images, f, ensure_ascii=False, indent=2)
    
    print(f"\n提取完成!")
    print(f"总计提取: {len(all_extracted_images)} 张图片")
    print(f"输出目录: {output_dir}")
    print(f"图片信息: {info_file}")
    
    return all_extracted_images

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\n用户中断操作")
        sys.exit(1)
    except Exception as e:
        print(f"\n程序出错: {e}")
        sys.exit(1)