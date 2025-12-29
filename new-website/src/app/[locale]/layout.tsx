import { notFound } from 'next/navigation';
import { locales, type Locale, defaultLocale } from '@/config/i18n';
import { Toaster } from 'sonner';
import type { Metadata } from "next";
import { TranslationProvider } from '@/contexts/TranslationContext';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ locale: string }> 
}): Promise<Metadata> {
  const { locale } = await params;
  
  // Define metadata for each language
  const metadata = {
    zh: {
      title: "深圳普耐斯机电设备有限公司 - 专业钢板切割设备制造商",
      description: "深圳普耐斯机电设备有限公司，专业从事钢板切割设备、台湾荣华分条机、等离子激光切割系统制造。自2005年起为客户提供优质设备解决方案。",
      keywords: "钢板切割设备, CNC切割设备, 等离子切割, 激光切割, 火焰切割, 金属制造, 工业切割, 台湾荣华机械",
      author: "深圳普耐斯机电设备有限公司",
      siteName: "深圳普耐斯机电设备有限公司",
      ogDescription: "专业从事钢板切割设备制造，台湾荣华分条机代理，为金属制造行业提供优质解决方案。",
      altText: "普耐斯钢板切割设备",
      ogLocale: "zh_CN"
    },
    en: {
      title: "Shenzhen Punaise Mechanical Equipment Co., Ltd. - Professional Steel Cutting Equipment Manufacturer",
      description: "Shenzhen Punaise Mechanical Equipment Co., Ltd. specializes in steel cutting equipment manufacturing, Taiwan Runghua slitting machines, plasma laser cutting systems. Providing quality equipment solutions since 2005.",
      keywords: "steel plate cutting, CNC cutting equipment, plasma cutting, laser cutting, flame cutting, metal fabrication, industrial cutting, Taiwan Runghua machinery",
      author: "Shenzhen Punaise Mechanical Equipment Co., Ltd.",
      siteName: "Shenzhen Punaise Mechanical Equipment",
      ogDescription: "Professional steel cutting equipment manufacturer, Taiwan Runghua slitting machine agent, providing quality solutions for metal manufacturing industry.",
      altText: "Punaise Steel Cutting Equipment",
      ogLocale: "en_US"
    },
    th: {
      title: "เซินเจิ้น ปูไนส์ อุปกรณ์เครื่องจักรกล - ผู้ผลิตอุปกรณ์ตัดเหล็กแผ่นมืออาชีพ",
      description: "เซินเจิ้น ปูไนส์ อุปกรณ์เครื่องจักรกล ผู้เชี่ยวชาญในการผลิตอุปกรณ์ตัดเหล็กแผ่น เครื่องจักรไต้หวันรุ่งฮั่ว ระบบตัดพลาสม่าและเลเซอร์",
      keywords: "อุปกรณ์ตัดเหล็กแผ่น, เครื่องตัด CNC, ตัดพลาสม่า, ตัดเลเซอร์, ตัดเปลวไฟ, การผลิตโลหะ, การตัดอุตสาหกรรม",
      author: "เซินเจิ้น ปูไนส์ อุปกรณ์เครื่องจักรกล",
      siteName: "ปูไนส์ อุปกรณ์เครื่องจักรกล",
      ogDescription: "ผู้ผลิตอุปกรณ์ตัดเหล็กแผ่นมืออาชีพ ให้บริการโซลูชันคุณภาพสูงสำหรับอุตสาหกรรมโลหะ",
      altText: "อุปกรณ์ตัดเหล็กปูไนส์",
      ogLocale: "th_TH"
    },
    vi: {
      title: "Công ty Thiết bị Cơ khí Punaise Thâm Quyến - Nhà sản xuất thiết bị cắt tấm thép chuyên nghiệp",
      description: "Công ty Thiết bị Cơ khí Punaise Thâm Quyến chuyên sản xuất thiết bị cắt tấm thép, máy móc Đài Loan Rong Hua, hệ thống cắt plasma laser",
      keywords: "thiết bị cắt tấm thép, máy cắt CNC, cắt plasma, cắt laser, cắt khí, chế tạo kim loại, cắt công nghiệp",
      author: "Công ty Thiết bị Cơ khí Punaise Thâm Quyến",
      siteName: "Punaise Thiết bị Cơ khí",
      ogDescription: "Nhà sản xuất thiết bị cắt tấm thép chuyên nghiệp, cung cấp giải pháp chất lượng cao cho ngành công nghiệp kim loại",
      altText: "Thiết bị cắt thép Punaise",
      ogLocale: "vi_VN"
    },
    ms: {
      title: "Shenzhen Punaise Mechanical Equipment - Pengeluar Peralatan Pemotongan Plat Keluli Profesional",
      description: "Shenzhen Punaise Mechanical Equipment pakar dalam pembuatan peralatan pemotongan plat keluli, jentera Taiwan Rong Hua, sistem pemotong plasma laser",
      keywords: "peralatan pemotongan plat keluli, mesin pemotong CNC, pemotongan plasma, pemotongan laser, pemotongan api, pembuatan logam, pemotongan industri",
      author: "Shenzhen Punaise Mechanical Equipment",
      siteName: "Punaise Mechanical Equipment",
      ogDescription: "Pengeluar peralatan pemotongan plat keluli profesional, menyediakan penyelesaian berkualiti tinggi untuk industri logam",
      altText: "Peralatan Pemotong Keluli Punaise",
      ogLocale: "ms_MY"
    },
    id: {
      title: "Shenzhen Punaise Mechanical Equipment - Produsen Peralatan Pemotongan Pelat Baja Profesional",
      description: "Shenzhen Punaise Mechanical Equipment mengkhususkan diri dalam pembuatan peralatan pemotongan pelat baja, mesin Taiwan Rong Hua, sistem pemotong plasma laser",
      keywords: "peralatan pemotongan pelat baja, mesin pemotong CNC, pemotongan plasma, pemotongan laser, pemotongan api, manufaktur logam, pemotongan industri",
      author: "Shenzhen Punaise Mechanical Equipment",
      siteName: "Punaise Mechanical Equipment",
      ogDescription: "Produsen peralatan pemotongan pelat baja profesional, menyediakan solusi berkualitas tinggi untuk industri logam",
      altText: "Peralatan Pemotong Baja Punaise",
      ogLocale: "id_ID"
    },
    es: {
      title: "Shenzhen Punaise Mechanical Equipment - Fabricante Profesional de Equipos de Corte de Placas de Acero",
      description: "Shenzhen Punaise Mechanical Equipment se especializa en la fabricación de equipos de corte de placas de acero, maquinaria Taiwan Rong Hua, sistemas de corte por plasma láser",
      keywords: "equipos de corte de placas de acero, máquinas de corte CNC, corte por plasma, corte por láser, corte por llama, fabricación de metales, corte industrial",
      author: "Shenzhen Punaise Mechanical Equipment",
      siteName: "Punaise Mechanical Equipment",
      ogDescription: "Fabricante profesional de equipos de corte de placas de acero, proporcionando soluciones de alta calidad para la industria metalúrgica",
      altText: "Equipos de Corte de Acero Punaise",
      ogLocale: "es_ES"
    },
    pt: {
      title: "Shenzhen Punaise Mechanical Equipment - Fabricante Profissional de Equipamentos de Corte de Chapas de Aço",
      description: "Shenzhen Punaise Mechanical Equipment especializa-se na fabricação de equipamentos de corte de chapas de aço, maquinário Taiwan Rong Hua, sistemas de corte por plasma laser",
      keywords: "equipamentos de corte de chapas de aço, máquinas de corte CNC, corte por plasma, corte a laser, corte por chama, fabricação de metais, corte industrial",
      author: "Shenzhen Punaise Mechanical Equipment",
      siteName: "Punaise Mechanical Equipment",
      ogDescription: "Fabricante profissional de equipamentos de corte de chapas de aço, fornecendo soluções de alta qualidade para a indústria metalúrgica",
      altText: "Equipamentos de Corte de Aço Punaise",
      ogLocale: "pt_BR"
    }
  };

  const currentMetadata = metadata[locale as keyof typeof metadata] || metadata.zh;

  return {
    title: currentMetadata.title,
    description: currentMetadata.description,
    keywords: currentMetadata.keywords,
    authors: [{ name: currentMetadata.author }],
    openGraph: {
      type: "website",
      locale: currentMetadata.ogLocale,
      url: `https://cute-jelly-dc03bf.netlify.app/${locale}`,
      siteName: currentMetadata.siteName,
      title: currentMetadata.title,
      description: currentMetadata.ogDescription,
      images: [
        {
          url: "/images/punaise-cutting-equipment.jpg",
          width: 1200,
          height: 630,
          alt: currentMetadata.altText,
        },
      ],
    },
    alternates: {
      languages: {
        'zh': 'https://cute-jelly-dc03bf.netlify.app/zh',
        'en': 'https://cute-jelly-dc03bf.netlify.app/en',
        'th': 'https://cute-jelly-dc03bf.netlify.app/th',
        'vi': 'https://cute-jelly-dc03bf.netlify.app/vi',
        'ms': 'https://cute-jelly-dc03bf.netlify.app/ms',
        'id': 'https://cute-jelly-dc03bf.netlify.app/id',
        'es': 'https://cute-jelly-dc03bf.netlify.app/es',
        'pt': 'https://cute-jelly-dc03bf.netlify.app/pt',
        'x-default': 'https://cute-jelly-dc03bf.netlify.app/zh'
      }
    }
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) {
    notFound();
  }

  // Import messages directly to avoid getRequestConfig issues
  let messages;
  try {
    switch (locale) {
      case 'zh':
        messages = (await import('../../../messages/zh.json')).default;
        break;
      case 'en':
        messages = (await import('../../../messages/en.json')).default;
        break;
      case 'th':
        messages = (await import('../../../messages/th.json')).default;
        break;
      case 'vi':
        messages = (await import('../../../messages/vi.json')).default;
        break;
      case 'ms':
        messages = (await import('../../../messages/ms.json')).default;
        break;
      case 'id':
        messages = (await import('../../../messages/id.json')).default;
        break;
      case 'es':
        messages = (await import('../../../messages/es.json')).default;
        break;
      case 'pt':
        messages = (await import('../../../messages/pt.json')).default;
        break;
      default:
        messages = (await import('../../../messages/zh.json')).default;
    }
  } catch (error) {
    messages = (await import('../../../messages/zh.json')).default;
  }

  return (
    <TranslationProvider messages={messages} locale={locale}>
      {children}
      <Toaster />
    </TranslationProvider>
  );
}