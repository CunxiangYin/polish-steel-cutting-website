// Language Translation System for Punaise Website
const translations = {
    en: {
        // Navigation
        nav: {
            home: "Home",
            about: "About",
            products: "Products",
            features: "Features",
            contact: "Contact"
        },
        
        // Hero Section
        hero: {
            title: "Professional <span class='highlight'>Steel Cutting</span> Equipment Manufacturer",
            subtitle: "Shenzhen Punaise Mechanical and Electrical Equipment Co., Ltd. - Since 2005, specializing in steel plates, steel plate processing equipment, auxiliary equipment and Taiwan Ronghua precision machinery for global metal fabrication industries.",
            getQuote: "Get Quote",
            watchDemo: "Watch Demo",
            stats: {
                partners: "Regional Partners",
                experience: "Years Experience",
                quality: "Quality Assurance"
            },
            scrollDown: "Scroll Down"
        },
        
        // About Section
        about: {
            title: "Leading Steel Cutting Technology Since 2005",
            description: "Shenzhen Punaise Mechanical and Electrical Equipment Co., Ltd. specializes in sales of steel plates, steel plate processing equipment, auxiliary equipment, parts, and peripheral materials. We provide technical maintenance and consulting services, featuring Taiwan Ronghua precision machinery for metal fabrication industries worldwide.",
            features: {
                quality: {
                    title: "Quality Equipment",
                    desc: "Professional steel processing equipment sourced from reliable manufacturers including Taiwan Ronghua machinery."
                },
                service: {
                    title: "Professional Service",
                    desc: "Comprehensive sales support with technical consulting, maintenance guidance and spare parts supply."
                },
                support: {
                    title: "Local Support",
                    desc: "Based in Shenzhen with deep understanding of regional market needs and quick response capabilities."
                }
            }
        },
        
        // Products Section
        products: {
            title: "Steel Processing Equipment Portfolio",
            subtitle: "Comprehensive range of precision cutting systems, Taiwan Ronghua slitting machines, and steel processing equipment for metal fabrication and industrial applications",
            items: {
                steelPlate: {
                    title: "Steel Plate Processing Equipment",
                    desc: "Complete range of steel plate processing equipment including cutting machines, auxiliary equipment and spare parts.",
                    features: ["Various steel plate thicknesses", "Professional technical support", "Quality assured equipment"]
                },
                conveyor: {
                    title: "Conveyor Belts & Mobile Platforms",
                    desc: "Industrial conveyor systems, steel coil tipping machines, and mobile platform cars for material handling.",
                    features: ["Heavy-duty construction", "Customizable configurations", "Reliable operation"]
                },
                ronghua: {
                    title: "Taiwan Ronghua Slitting Machines",
                    desc: "Professional steel coil slitting equipment and flying shears for precision material processing and continuous steel operations.",
                    features: ["High-speed slitting capability", "Precision steel strip cutting", "Taiwan quality assurance"]
                }
            },
            learnMore: "Learn More"
        },
        
        // Features Section
        features: {
            title: "Why Choose Punaise Equipment Solutions?",
            subtitle: "Our commitment to quality equipment distribution and professional service has made us a trusted partner for steel processing companies throughout Guangdong region.",
            items: {
                partnership: {
                    title: "Trusted Partnership",
                    desc: "Authorized distributor of Taiwan Ronghua equipment with comprehensive technical support and warranty coverage."
                },
                coverage: {
                    title: "Regional Coverage",
                    desc: "Efficient delivery throughout Guangdong Province and neighboring regions with local technical support."
                },
                consulting: {
                    title: "Technical Consulting",
                    desc: "Professional maintenance and consulting services with Manager Fu's expertise in steel processing equipment."
                }
            },
            stats: {
                quality: "Equipment Quality",
                satisfaction: "Customer Satisfaction",
                coverage: "Regional Coverage"
            }
        },
        
        // Testimonials Section
        testimonials: {
            title: "What Our Clients Say",
            subtitle: "Trusted by industry leaders worldwide"
        },
        
        // Contact Section
        contact: {
            title: "Get In Touch",
            subtitle: "Ready to upgrade your steel processing capabilities? Contact Punaise experts for professional steel plate processing equipment and Taiwan Ronghua machinery solutions. Serving clients since 2005.",
            form: {
                name: "Full Name *",
                email: "Email Address *",
                company: "Company Name",
                phone: "Phone Number",
                service: "Service Interest",
                selectProduct: "Select a product",
                message: "Message *",
                messagePlaceholder: "Please describe your requirements...",
                submit: "Send Message",
                services: {
                    plasma: "CNC Plasma Cutting",
                    laser: "Laser Cutting Systems",
                    flame: "Flame Cutting Equipment",
                    consultation: "Technical Consultation",
                    support: "Support & Maintenance"
                }
            },
            info: {
                address: "Company Address",
                phone: "Phone",
                email: "Email"
            }
        },
        
        // Footer
        footer: {
            sections: {
                products: "Products",
                services: "Services",
                company: "Company",
                resources: "Resources"
            },
            productLinks: ["CNC Plasma Cutting", "Laser Cutting Systems", "Flame Cutting Equipment", "Cutting Accessories", "Custom Solutions"],
            serviceLinks: ["Technical Support", "Installation", "Maintenance", "Training", "Consulting"],
            companyLinks: ["About Us", "Careers", "News & Events", "Case Studies", "Contact"],
            resourceLinks: ["Documentation", "Downloads", "White Papers", "Webinars", "FAQ"],
            copyright: "© 2024 Shenzhen Punaise Mechanical and Electrical Equipment Co., Ltd. All rights reserved. | Unified Social Credit Code: 914403007703327657",
            legal: {
                privacy: "Privacy Policy",
                terms: "Terms of Service",
                cookie: "Cookie Policy"
            }
        }
    },
    
    zh: {
        // 导航
        nav: {
            home: "首页",
            about: "关于我们",
            products: "产品中心",
            features: "服务特色",
            contact: "联系我们"
        },
        
        // 首屏
        hero: {
            title: "专业<span class='highlight'>钢板切割</span>设备供应商",
            subtitle: "深圳市普耐斯机电设备有限公司 - 自2005年成立以来，专注于钢板、钢板加工设备、辅助设备及台湾荣华精密机械的销售与服务，为全球金属加工行业提供优质解决方案。",
            getQuote: "获取报价",
            watchDemo: "观看演示",
            stats: {
                partners: "区域合作伙伴",
                experience: "年行业经验",
                quality: "品质保证"
            },
            scrollDown: "向下滚动"
        },
        
        // 关于我们
        about: {
            title: "自2005年以来领先的钢板切割技术",
            description: "深圳市普耐斯机电设备有限公司专业从事钢板、钢板加工设备、辅助设备、零配件及周边材料的销售。我们提供技术维护和咨询服务，特别是台湾荣华精密机械，为全球金属加工行业服务。",
            features: {
                quality: {
                    title: "优质设备",
                    desc: "专业钢板加工设备，来自可靠制造商，包括台湾荣华机械设备。"
                },
                service: {
                    title: "专业服务",
                    desc: "提供全面的销售支持，包括技术咨询、维护指导和备件供应。"
                },
                support: {
                    title: "本地支持",
                    desc: "立足深圳，深入了解区域市场需求，提供快速响应服务。"
                }
            }
        },
        
        // 产品中心
        products: {
            title: "钢板加工设备产品线",
            subtitle: "提供全系列精密切割系统、台湾荣华分条机和钢板加工设备，满足金属加工和工业应用需求",
            items: {
                steelPlate: {
                    title: "钢板加工设备",
                    desc: "全系列钢板加工设备，包括切割机、辅助设备和备件。",
                    features: ["适用各种钢板厚度", "专业技术支持", "品质保证设备"]
                },
                conveyor: {
                    title: "输送带和移动平台",
                    desc: "工业输送系统、钢卷翻转机和移动平台车，用于物料搬运。",
                    features: ["重型结构设计", "可定制配置", "运行可靠稳定"]
                },
                ronghua: {
                    title: "台湾荣华分条机",
                    desc: "专业钢卷分条设备和飞剪，用于精密材料加工和连续钢材作业。",
                    features: ["高速分条能力", "精密钢带切割", "台湾品质保证"]
                }
            },
            learnMore: "了解更多"
        },
        
        // 服务特色
        features: {
            title: "为什么选择普耐斯设备方案？",
            subtitle: "我们对优质设备分销和专业服务的承诺，使我们成为广东地区钢材加工企业值得信赖的合作伙伴。",
            items: {
                partnership: {
                    title: "值得信赖的伙伴",
                    desc: "台湾荣华设备授权经销商，提供全面的技术支持和保修服务。"
                },
                coverage: {
                    title: "区域覆盖",
                    desc: "高效配送覆盖广东省及周边地区，提供本地技术支持。"
                },
                consulting: {
                    title: "技术咨询",
                    desc: "傅经理凭借在钢板加工设备领域的专业知识，提供专业维护和咨询服务。"
                }
            },
            stats: {
                quality: "设备质量",
                satisfaction: "客户满意度",
                coverage: "区域覆盖率"
            }
        },
        
        // 客户评价
        testimonials: {
            title: "客户评价",
            subtitle: "深受行业领导者信赖"
        },
        
        // 联系我们
        contact: {
            title: "联系我们",
            subtitle: "准备升级您的钢板加工能力？联系普耐斯专家，获取专业的钢板加工设备和台湾荣华机械解决方案。自2005年以来为客户服务。",
            form: {
                name: "姓名 *",
                email: "电子邮箱 *",
                company: "公司名称",
                phone: "联系电话",
                service: "服务需求",
                selectProduct: "选择产品",
                message: "留言 *",
                messagePlaceholder: "请描述您的需求...",
                submit: "发送消息",
                services: {
                    plasma: "CNC等离子切割",
                    laser: "激光切割系统",
                    flame: "火焰切割设备",
                    consultation: "技术咨询",
                    support: "支持与维护"
                }
            },
            info: {
                address: "公司地址",
                phone: "联系电话",
                email: "电子邮箱"
            }
        },
        
        // 页脚
        footer: {
            sections: {
                products: "产品中心",
                services: "服务项目",
                company: "关于公司",
                resources: "资源中心"
            },
            productLinks: ["CNC等离子切割", "激光切割系统", "火焰切割设备", "切割配件", "定制方案"],
            serviceLinks: ["技术支持", "安装服务", "设备维护", "操作培训", "技术咨询"],
            companyLinks: ["关于我们", "人才招聘", "新闻动态", "案例研究", "联系方式"],
            resourceLinks: ["技术文档", "资料下载", "白皮书", "网络研讨会", "常见问题"],
            copyright: "© 2024 深圳市普耐斯机电设备有限公司 版权所有 | 统一社会信用代码：914403007703327657",
            legal: {
                privacy: "隐私政策",
                terms: "服务条款",
                cookie: "Cookie政策"
            }
        }
    },
    
    // Spanish (Latin America)
    es: {
        // Navegación
        nav: {
            home: "Inicio",
            about: "Nosotros",
            products: "Productos",
            features: "Servicios",
            contact: "Contacto"
        },
        
        // Sección Principal
        hero: {
            title: "Fabricante Profesional de <span class='highlight'>Equipos de Corte</span> de Acero",
            subtitle: "Shenzhen Punaise Mechanical and Electrical Equipment Co., Ltd. - Desde 2005, especializada en placas de acero, equipos de procesamiento de placas de acero, equipos auxiliares y maquinaria de precisión Taiwan Ronghua para industrias globales de fabricación de metales.",
            getQuote: "Solicitar Cotización",
            watchDemo: "Ver Demostración",
            stats: {
                partners: "Socios Regionales",
                experience: "Años de Experiencia",
                quality: "Garantía de Calidad"
            },
            scrollDown: "Desplazar Hacia Abajo"
        },
        
        // Sobre Nosotros
        about: {
            title: "Líder en Tecnología de Corte de Acero Desde 2005",
            description: "Shenzhen Punaise Mechanical and Electrical Equipment Co., Ltd. se especializa en la venta de placas de acero, equipos de procesamiento de placas de acero, equipos auxiliares, piezas y materiales periféricos. Proporcionamos servicios de mantenimiento técnico y consultoría, destacando la maquinaria de precisión Taiwan Ronghua para industrias de fabricación de metales a nivel mundial.",
            features: {
                quality: {
                    title: "Equipos de Calidad",
                    desc: "Equipos profesionales de procesamiento de acero de fabricantes confiables, incluyendo maquinaria Taiwan Ronghua."
                },
                service: {
                    title: "Servicio Profesional",
                    desc: "Soporte integral de ventas con consultoría técnica, orientación de mantenimiento y suministro de repuestos."
                },
                support: {
                    title: "Soporte Local",
                    desc: "Con sede en Shenzhen, profundo conocimiento de las necesidades del mercado regional y capacidades de respuesta rápida."
                }
            }
        },
        
        // Productos
        products: {
            title: "Portafolio de Equipos de Procesamiento de Acero",
            subtitle: "Gama completa de sistemas de corte de precisión, máquinas rebanadoras Taiwan Ronghua y equipos de procesamiento de acero para fabricación de metales y aplicaciones industriales",
            items: {
                steelPlate: {
                    title: "Equipos de Procesamiento de Placas de Acero",
                    desc: "Gama completa de equipos de procesamiento de placas de acero incluyendo máquinas cortadoras, equipos auxiliares y repuestos.",
                    features: ["Varios espesores de placas de acero", "Soporte técnico profesional", "Equipos de calidad asegurada"]
                },
                conveyor: {
                    title: "Cintas Transportadoras y Plataformas Móviles",
                    desc: "Sistemas transportadores industriales, máquinas volcadoras de bobinas de acero y carros de plataforma móvil para manejo de materiales.",
                    features: ["Construcción robusta", "Configuraciones personalizables", "Operación confiable"]
                },
                ronghua: {
                    title: "Máquinas Rebanadoras Taiwan Ronghua",
                    desc: "Equipos profesionales de rebabado de bobinas de acero y cizallas voladoras para procesamiento de materiales de precisión y operaciones continuas de acero.",
                    features: ["Capacidad de rebabado de alta velocidad", "Corte de tiras de acero de precisión", "Garantía de calidad Taiwan"]
                }
            },
            learnMore: "Saber Más"
        },
        
        // Características
        features: {
            title: "¿Por Qué Elegir las Soluciones de Equipos Punaise?",
            subtitle: "Nuestro compromiso con la distribución de equipos de calidad y el servicio profesional nos ha convertido en un socio confiable para empresas de procesamiento de acero en toda la región de Guangdong.",
            items: {
                partnership: {
                    title: "Alianza Confiable",
                    desc: "Distribuidor autorizado de equipos Taiwan Ronghua con soporte técnico integral y cobertura de garantía."
                },
                coverage: {
                    title: "Cobertura Regional",
                    desc: "Entrega eficiente en toda la Provincia de Guangdong y regiones vecinas con soporte técnico local."
                },
                consulting: {
                    title: "Consultoría Técnica",
                    desc: "Servicios profesionales de mantenimiento y consultoría con la experiencia del Gerente Fu en equipos de procesamiento de acero."
                }
            },
            stats: {
                quality: "Calidad del Equipo",
                satisfaction: "Satisfacción del Cliente",
                coverage: "Cobertura Regional"
            }
        },
        
        // Testimonios
        testimonials: {
            title: "Lo Que Dicen Nuestros Clientes",
            subtitle: "Confianza de líderes de la industria en todo el mundo"
        },
        
        // Contacto
        contact: {
            title: "Póngase en Contacto",
            subtitle: "¿Listo para mejorar sus capacidades de procesamiento de acero? Contacte a los expertos de Punaise para soluciones profesionales de equipos de procesamiento de placas de acero y maquinaria Taiwan Ronghua. Sirviendo a clientes desde 2005.",
            form: {
                name: "Nombre Completo *",
                email: "Dirección de Correo Electrónico *",
                company: "Nombre de la Empresa",
                phone: "Número de Teléfono",
                service: "Interés en Servicio",
                selectProduct: "Seleccionar un producto",
                message: "Mensaje *",
                messagePlaceholder: "Por favor describa sus requerimientos...",
                submit: "Enviar Mensaje",
                services: {
                    plasma: "Corte por Plasma CNC",
                    laser: "Sistemas de Corte Láser",
                    flame: "Equipos de Corte por Llama",
                    consultation: "Consultoría Técnica",
                    support: "Soporte y Mantenimiento"
                }
            },
            info: {
                address: "Dirección de la Empresa",
                phone: "Teléfono",
                email: "Correo Electrónico"
            }
        },
        
        // Pie de Página
        footer: {
            sections: {
                products: "Productos",
                services: "Servicios",
                company: "Empresa",
                resources: "Recursos"
            },
            productLinks: ["Corte por Plasma CNC", "Sistemas de Corte Láser", "Equipos de Corte por Llama", "Accesorios de Corte", "Soluciones Personalizadas"],
            serviceLinks: ["Soporte Técnico", "Instalación", "Mantenimiento", "Capacitación", "Consultoría"],
            companyLinks: ["Nosotros", "Carreras", "Noticias y Eventos", "Estudios de Caso", "Contacto"],
            resourceLinks: ["Documentación", "Descargas", "Documentos Técnicos", "Seminarios Web", "Preguntas Frecuentes"],
            copyright: "© 2024 Shenzhen Punaise Mechanical and Electrical Equipment Co., Ltd. Todos los derechos reservados. | Código de Crédito Social Unificado: 914403007703327657",
            legal: {
                privacy: "Política de Privacidad",
                terms: "Términos de Servicio",
                cookie: "Política de Cookies"
            }
        }
    },
    
    // Portuguese (Brazil)
    pt: {
        // Navegação
        nav: {
            home: "Início",
            about: "Sobre",
            products: "Produtos",
            features: "Serviços",
            contact: "Contato"
        },
        
        // Seção Principal
        hero: {
            title: "Fabricante Profissional de <span class='highlight'>Equipamentos de Corte</span> de Aço",
            subtitle: "Shenzhen Punaise Mechanical and Electrical Equipment Co., Ltd. - Desde 2005, especializada em chapas de aço, equipamentos de processamento de chapas de aço, equipamentos auxiliares e máquinas de precisão Taiwan Ronghua para indústrias globais de fabricação de metais.",
            getQuote: "Solicitar Orçamento",
            watchDemo: "Assistir Demonstração",
            stats: {
                partners: "Parceiros Regionais",
                experience: "Anos de Experiência",
                quality: "Garantia de Qualidade"
            },
            scrollDown: "Rolar Para Baixo"
        },
        
        // Sobre Nós
        about: {
            title: "Líder em Tecnologia de Corte de Aço Desde 2005",
            description: "Shenzhen Punaise Mechanical and Electrical Equipment Co., Ltd. especializa-se na venda de chapas de aço, equipamentos de processamento de chapas de aço, equipamentos auxiliares, peças e materiais periféricos. Fornecemos serviços de manutenção técnica e consultoria, destacando máquinas de precisão Taiwan Ronghua para indústrias de fabricação de metais mundialmente.",
            features: {
                quality: {
                    title: "Equipamentos de Qualidade",
                    desc: "Equipamentos profissionais de processamento de aço de fabricantes confiáveis, incluindo máquinas Taiwan Ronghua."
                },
                service: {
                    title: "Serviço Profissional",
                    desc: "Suporte abrangente de vendas com consultoria técnica, orientação de manutenção e fornecimento de peças de reposição."
                },
                support: {
                    title: "Suporte Local",
                    desc: "Baseada em Shenzhen, com profundo conhecimento das necessidades do mercado regional e capacidades de resposta rápida."
                }
            }
        },
        
        // Produtos
        products: {
            title: "Portfólio de Equipamentos de Processamento de Aço",
            subtitle: "Gama completa de sistemas de corte de precisão, máquinas de corte Taiwan Ronghua e equipamentos de processamento de aço para fabricação de metais e aplicações industriais",
            items: {
                steelPlate: {
                    title: "Equipamentos de Processamento de Chapas de Aço",
                    desc: "Gama completa de equipamentos de processamento de chapas de aço incluindo máquinas de corte, equipamentos auxiliares e peças de reposição.",
                    features: ["Várias espessuras de chapas de aço", "Suporte técnico profissional", "Equipamentos com qualidade garantida"]
                },
                conveyor: {
                    title: "Correias Transportadoras e Plataformas Móveis",
                    desc: "Sistemas transportadores industriais, máquinas de tombamento de bobinas de aço e carros de plataforma móvel para manuseio de materiais.",
                    features: ["Construção robusta", "Configurações personalizáveis", "Operação confiável"]
                },
                ronghua: {
                    title: "Máquinas de Corte Taiwan Ronghua",
                    desc: "Equipamentos profissionais de corte de bobinas de aço e tesouras voadoras para processamento de materiais de precisão e operações contínuas de aço.",
                    features: ["Capacidade de corte de alta velocidade", "Corte de tiras de aço de precisão", "Garantia de qualidade Taiwan"]
                }
            },
            learnMore: "Saiba Mais"
        },
        
        // Características
        features: {
            title: "Por Que Escolher as Soluções de Equipamentos Punaise?",
            subtitle: "Nosso compromisso com a distribuição de equipamentos de qualidade e serviço profissional nos tornou um parceiro confiável para empresas de processamento de aço em toda a região de Guangdong.",
            items: {
                partnership: {
                    title: "Parceria Confiável",
                    desc: "Distribuidor autorizado de equipamentos Taiwan Ronghua com suporte técnico abrangente e cobertura de garantia."
                },
                coverage: {
                    title: "Cobertura Regional",
                    desc: "Entrega eficiente em toda a Província de Guangdong e regiões vizinhas com suporte técnico local."
                },
                consulting: {
                    title: "Consultoria Técnica",
                    desc: "Serviços profissionais de manutenção e consultoria com a expertise do Gerente Fu em equipamentos de processamento de aço."
                }
            },
            stats: {
                quality: "Qualidade do Equipamento",
                satisfaction: "Satisfação do Cliente",
                coverage: "Cobertura Regional"
            }
        },
        
        // Depoimentos
        testimonials: {
            title: "O Que Nossos Clientes Dizem",
            subtitle: "Confiança de líderes da indústria mundialmente"
        },
        
        // Contato
        contact: {
            title: "Entre em Contato",
            subtitle: "Pronto para melhorar suas capacidades de processamento de aço? Entre em contato com os especialistas da Punaise para soluções profissionais de equipamentos de processamento de chapas de aço e máquinas Taiwan Ronghua. Servindo clientes desde 2005.",
            form: {
                name: "Nome Completo *",
                email: "Endereço de E-mail *",
                company: "Nome da Empresa",
                phone: "Número de Telefone",
                service: "Interesse em Serviço",
                selectProduct: "Selecionar um produto",
                message: "Mensagem *",
                messagePlaceholder: "Por favor descreva seus requisitos...",
                submit: "Enviar Mensagem",
                services: {
                    plasma: "Corte por Plasma CNC",
                    laser: "Sistemas de Corte a Laser",
                    flame: "Equipamentos de Corte a Chama",
                    consultation: "Consultoria Técnica",
                    support: "Suporte e Manutenção"
                }
            },
            info: {
                address: "Endereço da Empresa",
                phone: "Telefone",
                email: "E-mail"
            }
        },
        
        // Rodapé
        footer: {
            sections: {
                products: "Produtos",
                services: "Serviços",
                company: "Empresa",
                resources: "Recursos"
            },
            productLinks: ["Corte por Plasma CNC", "Sistemas de Corte a Laser", "Equipamentos de Corte a Chama", "Acessórios de Corte", "Soluções Personalizadas"],
            serviceLinks: ["Suporte Técnico", "Instalação", "Manutenção", "Treinamento", "Consultoria"],
            companyLinks: ["Sobre Nós", "Carreiras", "Notícias e Eventos", "Estudos de Caso", "Contato"],
            resourceLinks: ["Documentação", "Downloads", "White Papers", "Webinars", "FAQ"],
            copyright: "© 2024 Shenzhen Punaise Mechanical and Electrical Equipment Co., Ltd. Todos os direitos reservados. | Código de Crédito Social Unificado: 914403007703327657",
            legal: {
                privacy: "Política de Privacidade",
                terms: "Termos de Serviço",
                cookie: "Política de Cookies"
            }
        }
    },
    
    // Thai (Thailand)
    th: {
        // การนำทาง
        nav: {
            home: "หน้าหลัก",
            about: "เกี่ยวกับเรา",
            products: "ผลิตภัณฑ์",
            features: "บริการ",
            contact: "ติดต่อเรา"
        },
        
        // หัวข้อหลัก
        hero: {
            title: "ผู้ผลิต<span class='highlight'>อุปกรณ์ตัดเหล็ก</span>มืออาชีพ",
            subtitle: "บริษัท เซินเจิ้น ปูไนส์ เมคคานิคอล แอนด์ อิเล็กทริคอล อีควิปเมนท์ จำกัด - ตั้งแต่ปี 2005 เชี่ยวชาญด้านแผ่นเหล็ก อุปกรณ์ประมวลผลแผ่นเหล็ก อุปกรณ์เสริม และเครื่องจักรความแม่นยำไต้หวันรงฮัว สำหรับอุตสาหกรรมการผลิตโลหะทั่วโลก",
            getQuote: "ขอใบเสนอราคา",
            watchDemo: "ดูการสาธิต",
            stats: {
                partners: "พันธมิตรในภูมิภาค",
                experience: "ปีของประสบการณ์",
                quality: "การรับประกันคุณภาพ"
            },
            scrollDown: "เลื่อนลง"
        },
        
        // เกี่ยวกับเรา
        about: {
            title: "ผู้นำเทคโนโลยีการตัดเหล็กตั้งแต่ปี 2005",
            description: "บริษัท เซินเจิ้น ปูไนส์ เมคคานิคอล แอนด์ อิเล็กทริคอล อีควิปเมนท์ จำกัด เชี่ยวชาญในการจำหน่ายแผ่นเหล็ก อุปกรณ์ประมวลผลแผ่นเหล็ก อุปกรณ์เสริม ชิ้นส่วน และวัสดุโดยรอบ เราให้บริการซ่อมบำรุงทางเทคนิคและให้คำปรึกษา โดยมีเครื่องจักรความแม่นยำไต้หวันรงฮัวสำหรับอุตสาหกรรมการผลิตโลหะทั่วโลก",
            features: {
                quality: {
                    title: "อุปกรณ์คุณภาพ",
                    desc: "อุปกรณ์ประมวลผลเหล็กมืออาชีพจากผู้ผลิตที่เชื่อถือได้ รวมถึงเครื่องจักรไต้หวันรงฮัว"
                },
                service: {
                    title: "บริการมืออาชีพ",
                    desc: "การสนับสนุนการขายที่ครอบคลุมพร้อมคำปรึกษาทางเทคนิค คำแนะนำการบำรุงรักษา และการจัดหาอะไหล่"
                },
                support: {
                    title: "การสนับสนุนในท้องถิ่น",
                    desc: "ตั้งอยู่ในเซินเจิ้น มีความเข้าใจลึกซึ้งเกี่ยวกับความต้องการของตลาดในภูมิภาคและความสามารถในการตอบสนองอย่างรวดเร็ว"
                }
            }
        },
        
        // ผลิตภัณฑ์
        products: {
            title: "ผลิตภัณฑ์อุปกรณ์ประมวลผลเหล็ก",
            subtitle: "ระบบตัดความแม่นยำ เครื่องตัดชิ้นไต้หวันรงฮัว และอุปกรณ์ประมวลผลเหล็กครบครันสำหรับการผลิตโลหะและการใช้งานอุตสาหกรรม",
            items: {
                steelPlate: {
                    title: "อุปกรณ์ประมวลผลแผ่นเหล็ก",
                    desc: "อุปกรณ์ประมวลผลแผ่นเหล็กครบครัน รวมถึงเครื่องตัด อุปกรณ์เสริม และอะไหล่",
                    features: ["แผ่นเหล็กหนาหลายขนาด", "การสนับสนุนทางเทคนิคมืออาชีพ", "อุปกรณ์คุณภาพมีการรับประกัน"]
                },
                conveyor: {
                    title: "สายพานลำเลียงและแพลตฟอร์มเคลื่อนที่",
                    desc: "ระบบลำเลียงอุตสาหกรรม เครื่องพลิกม้วนเหล็ก และรถแพลตฟอร์มเคลื่อนที่สำหรับการจัดการวัสดุ",
                    features: ["โครงสร้างทนทาน", "การกำหนดค่าที่ปรับแต่งได้", "การทำงานที่เชื่อถือได้"]
                },
                ronghua: {
                    title: "เครื่องตัดชิ้นไต้หวันรงฮัว",
                    desc: "อุปกรณ์ตัดชิ้นม้วนเหล็กมืออาชีพและกรรไกรบินสำหรับการประมวลผลวัสดุความแม่นยำและการทำงานเหล็กต่อเนื่อง",
                    features: ["ความสามารถในการตัดชิ้นความเร็วสูง", "การตัดแถบเหล็กความแม่นยำ", "การรับประกันคุณภาพไต้หวัน"]
                }
            },
            learnMore: "เรียนรู้เพิ่มเติม"
        },
        
        // คุณสมบัติ
        features: {
            title: "ทำไมต้องเลือกโซลูชันอุปกรณ์ปูไนส์?",
            subtitle: "ความมุ่งมั่นของเราในการจัดจำหน่ายอุปกรณ์คุณภาพและบริการมืออาชีพทำให้เราเป็นพันธมิตรที่เชื่อถือได้สำหรับบริษัทประมวลผลเหล็กในภูมิภาคกวางตุ้ง",
            items: {
                partnership: {
                    title: "พันธมิตรที่เชื่อถือได้",
                    desc: "ตัวแทนจำหน่ายที่ได้รับอนุญาตของอุปกรณ์ไต้หวันรงฮัว พร้อมการสนับสนุนทางเทคนิคที่ครอบคลุมและการรับประกัน"
                },
                coverage: {
                    title: "การครอบคลุมในภูมิภาค",
                    desc: "การจัดส่งที่มีประสิทธิภาพทั่วมณฑลกวางตุ้งและภูมิภาคใกล้เคียงพร้อมการสนับสนุนทางเทคนิคในท้องถิ่น"
                },
                consulting: {
                    title: "คำปรึกษาทางเทคนิค",
                    desc: "บริการบำรุงรักษาและคำปรึกษามืออาชีพด้วยความเชี่ยวชาญของผู้จัดการฟูในอุปกรณ์ประมวลผลเหล็ก"
                }
            },
            stats: {
                quality: "คุณภาพอุปกรณ์",
                satisfaction: "ความพึงพอใจของลูกค้า",
                coverage: "การครอบคลุมภูมิภาค"
            }
        },
        
        // คำรับรอง
        testimonials: {
            title: "สิ่งที่ลูกค้าพูดถึงเรา",
            subtitle: "ได้รับความไว้วางใจจากผู้นำอุตสาหกรรมทั่วโลก"
        },
        
        // ติดต่อ
        contact: {
            title: "ติดต่อเรา",
            subtitle: "พร้อมที่จะอัพเกรดความสามารถในการประมวลผลเหล็กของคุณหรือไม่? ติดต่อผู้เชี่ยวชาญปูไนส์สำหรับโซลูชันอุปกรณ์ประมวลผลแผ่นเหล็กมืออาชีพและเครื่องจักรไต้หวันรงฮัว บริการลูกค้าตั้งแต่ปี 2005",
            form: {
                name: "ชื่อ-นามสกุล *",
                email: "ที่อยู่อีเมล *",
                company: "ชื่อบริษัท",
                phone: "หมายเลขโทรศัพท์",
                service: "ความสนใจในบริการ",
                selectProduct: "เลือกผลิตภัณฑ์",
                message: "ข้อความ *",
                messagePlaceholder: "โปรดอธิบายความต้องการของคุณ...",
                submit: "ส่งข้อความ",
                services: {
                    plasma: "การตัดด้วยพลาสมา CNC",
                    laser: "ระบบการตัดด้วยเลเซอร์",
                    flame: "อุปกรณ์ตัดด้วยเปลวไฟ",
                    consultation: "คำปรึกษาทางเทคนิค",
                    support: "การสนับสนุนและบำรุงรักษา"
                }
            },
            info: {
                address: "ที่อยู่บริษัท",
                phone: "โทรศัพท์",
                email: "อีเมล"
            }
        },
        
        // ส่วนท้าย
        footer: {
            sections: {
                products: "ผลิตภัณฑ์",
                services: "บริการ",
                company: "บริษัท",
                resources: "ทรัพยากร"
            },
            productLinks: ["การตัดพลาสมา CNC", "ระบบการตัดเลเซอร์", "อุปกรณ์ตัดเปลวไฟ", "อุปกรณ์เสริมการตัด", "โซลูชันที่กำหนดเอง"],
            serviceLinks: ["การสนับสนุนทางเทคนิค", "การติดตั้ง", "การบำรุงรักษา", "การฝึกอบรม", "คำปรึกษา"],
            companyLinks: ["เกี่ยวกับเรา", "อาชีพ", "ข่าวและกิจกรรม", "กรณีศึกษา", "ติดต่อ"],
            resourceLinks: ["เอกสาร", "ดาวน์โหลด", "เอกสารทางเทคนิค", "เว็บินาร์", "คำถามที่พบบ่อย"],
            copyright: "© 2024 Shenzhen Punaise Mechanical and Electrical Equipment Co., Ltd. สงวนลิขสิทธิ์ทั้งหมด | รหัสเครดิตสังคมแบบรวม: 914403007703327657",
            legal: {
                privacy: "นโยบายความเป็นส่วนตัว",
                terms: "เงื่อนไขการบริการ",
                cookie: "นโยบายคุกกี้"
            }
        }
    },
    
    // Vietnamese (Vietnam)
    vi: {
        // Điều hướng
        nav: {
            home: "Trang chủ",
            about: "Giới thiệu",
            products: "Sản phẩm",
            features: "Dịch vụ",
            contact: "Liên hệ"
        },
        
        // Phần chính
        hero: {
            title: "Nhà sản xuất <span class='highlight'>Thiết bị cắt thép</span> chuyên nghiệp",
            subtitle: "Công ty TNHH Thiết bị Cơ khí và Điện Shenzhen Punaise - Từ năm 2005, chuyên về tấm thép, thiết bị gia công tấm thép, thiết bị phụ trợ và máy móc chính xác Taiwan Ronghua cho các ngành chế tạo kim loại toàn cầu.",
            getQuote: "Yêu cầu báo giá",
            watchDemo: "Xem demo",
            stats: {
                partners: "Đối tác khu vực",
                experience: "Năm kinh nghiệm",
                quality: "Đảm bảo chất lượng"
            },
            scrollDown: "Cuộn xuống"
        },
        
        // Giới thiệu
        about: {
            title: "Dẫn đầu công nghệ cắt thép từ năm 2005",
            description: "Công ty TNHH Thiết bị Cơ khí và Điện Shenzhen Punaise chuyên bán tấm thép, thiết bị gia công tấm thép, thiết bị phụ trợ, phụ tùng và vật liệu ngoại vi. Chúng tôi cung cấp dịch vụ bảo trì kỹ thuật và tư vấn, với máy móc chính xác Taiwan Ronghua cho các ngành chế tạo kim loại trên toàn thế giới.",
            features: {
                quality: {
                    title: "Thiết bị chất lượng",
                    desc: "Thiết bị gia công thép chuyên nghiệp từ các nhà sản xuất đáng tin cậy, bao gồm máy móc Taiwan Ronghua."
                },
                service: {
                    title: "Dịch vụ chuyên nghiệp",
                    desc: "Hỗ trợ bán hàng toàn diện với tư vấn kỹ thuật, hướng dẫn bảo trì và cung cấp phụ tùng."
                },
                support: {
                    title: "Hỗ trợ địa phương",
                    desc: "Có trụ sở tại Shenzhen với hiểu biết sâu sắc về nhu cầu thị trường khu vực và khả năng phản ứng nhanh."
                }
            }
        },
        
        // Sản phẩm
        products: {
            title: "Danh mục Thiết bị Gia công Thép",
            subtitle: "Dải sản phẩm đầy đủ các hệ thống cắt chính xác, máy cắt lát Taiwan Ronghua và thiết bị gia công thép cho chế tạo kim loại và ứng dụng công nghiệp",
            items: {
                steelPlate: {
                    title: "Thiết bị Gia công Tấm thép",
                    desc: "Dải sản phẩm đầy đủ thiết bị gia công tấm thép bao gồm máy cắt, thiết bị phụ trợ và phụ tùng.",
                    features: ["Nhiều độ dày tấm thép khác nhau", "Hỗ trợ kỹ thuật chuyên nghiệp", "Thiết bị chất lượng được bảo đảm"]
                },
                conveyor: {
                    title: "Băng tải và Nền tảng di động",
                    desc: "Hệ thống băng tải công nghiệp, máy lật cuộn thép và xe nền tảng di động để xử lý vật liệu.",
                    features: ["Cấu trúc chắc chắn", "Cấu hình có thể tùy chỉnh", "Hoạt động đáng tin cậy"]
                },
                ronghua: {
                    title: "Máy cắt lát Taiwan Ronghua",
                    desc: "Thiết bị cắt lát cuộn thép chuyên nghiệp và kéo bay cho gia công vật liệu chính xác và hoạt động thép liên tục.",
                    features: ["Khả năng cắt lát tốc độ cao", "Cắt dải thép chính xác", "Bảo đảm chất lượng Taiwan"]
                }
            },
            learnMore: "Tìm hiểu thêm"
        },
        
        // Đặc điểm
        features: {
            title: "Tại sao chọn Giải pháp Thiết bị Punaise?",
            subtitle: "Cam kết của chúng tôi về phân phối thiết bị chất lượng và dịch vụ chuyên nghiệp đã khiến chúng tôi trở thành đối tác đáng tin cậy cho các công ty gia công thép trong toàn khu vực Guangdong.",
            items: {
                partnership: {
                    title: "Đối tác đáng tin cậy",
                    desc: "Nhà phân phối được ủy quyền của thiết bị Taiwan Ronghua với hỗ trợ kỹ thuật toàn diện và bảo hành."
                },
                coverage: {
                    title: "Phủ sóng khu vực",
                    desc: "Giao hàng hiệu quả trên toàn tỉnh Guangdong và các khu vực lân cận với hỗ trợ kỹ thuật địa phương."
                },
                consulting: {
                    title: "Tư vấn kỹ thuật",
                    desc: "Dịch vụ bảo trì và tư vấn chuyên nghiệp với chuyên môn của Quản lý Fu trong thiết bị gia công thép."
                }
            },
            stats: {
                quality: "Chất lượng thiết bị",
                satisfaction: "Sự hài lòng của khách hàng",
                coverage: "Phủ sóng khu vực"
            }
        },
        
        // Lời chứng thực
        testimonials: {
            title: "Khách hàng nói gì về chúng tôi",
            subtitle: "Được tin tưởng bởi các nhà lãnh đạo ngành trên toàn thế giới"
        },
        
        // Liên hệ
        contact: {
            title: "Liên hệ",
            subtitle: "Sẵn sàng nâng cấp khả năng gia công thép của bạn? Liên hệ với các chuyên gia Punaise cho giải pháp thiết bị gia công tấm thép chuyên nghiệp và máy móc Taiwan Ronghua. Phục vụ khách hàng từ năm 2005.",
            form: {
                name: "Họ và tên *",
                email: "Địa chỉ email *",
                company: "Tên công ty",
                phone: "Số điện thoại",
                service: "Quan tâm dịch vụ",
                selectProduct: "Chọn sản phẩm",
                message: "Tin nhắn *",
                messagePlaceholder: "Vui lòng mô tả yêu cầu của bạn...",
                submit: "Gửi tin nhắn",
                services: {
                    plasma: "Cắt plasma CNC",
                    laser: "Hệ thống cắt laser",
                    flame: "Thiết bị cắt ngọn lửa",
                    consultation: "Tư vấn kỹ thuật",
                    support: "Hỗ trợ và bảo trì"
                }
            },
            info: {
                address: "Địa chỉ công ty",
                phone: "Điện thoại",
                email: "Email"
            }
        },
        
        // Chân trang
        footer: {
            sections: {
                products: "Sản phẩm",
                services: "Dịch vụ",
                company: "Công ty",
                resources: "Tài nguyên"
            },
            productLinks: ["Cắt plasma CNC", "Hệ thống cắt laser", "Thiết bị cắt ngọn lửa", "Phụ kiện cắt", "Giải pháp tùy chỉnh"],
            serviceLinks: ["Hỗ trợ kỹ thuật", "Lắp đặt", "Bảo trì", "Đào tạo", "Tư vấn"],
            companyLinks: ["Giới thiệu", "Tuyển dụng", "Tin tức & Sự kiện", "Nghiên cứu trường hợp", "Liên hệ"],
            resourceLinks: ["Tài liệu", "Tải xuống", "Báo cáo kỹ thuật", "Hội thảo trực tuyến", "Câu hỏi thường gặp"],
            copyright: "© 2024 Shenzhen Punaise Mechanical and Electrical Equipment Co., Ltd. Tất cả quyền được bảo lưu. | Mã tín dụng xã hội thống nhất: 914403007703327657",
            legal: {
                privacy: "Chính sách bảo mật",
                terms: "Điều khoản dịch vụ",
                cookie: "Chính sách cookie"
            }
        }
    },
    
    // Indonesian (Indonesia)
    id: {
        // Navigasi
        nav: {
            home: "Beranda",
            about: "Tentang Kami",
            products: "Produk",
            features: "Layanan",
            contact: "Kontak"
        },
        
        // Bagian Utama
        hero: {
            title: "Produsen <span class='highlight'>Peralatan Pemotong Baja</span> Profesional",
            subtitle: "Shenzhen Punaise Mechanical and Electrical Equipment Co., Ltd. - Sejak 2005, mengkhususkan diri dalam pelat baja, peralatan pemrosesan pelat baja, peralatan tambahan dan mesin presisi Taiwan Ronghua untuk industri fabrikasi logam global.",
            getQuote: "Minta Penawaran",
            watchDemo: "Lihat Demo",
            stats: {
                partners: "Mitra Regional",
                experience: "Tahun Pengalaman",
                quality: "Jaminan Kualitas"
            },
            scrollDown: "Gulir ke Bawah"
        },
        
        // Tentang Kami
        about: {
            title: "Memimpin Teknologi Pemotongan Baja Sejak 2005",
            description: "Shenzhen Punaise Mechanical and Electrical Equipment Co., Ltd. mengkhususkan diri dalam penjualan pelat baja, peralatan pemrosesan pelat baja, peralatan tambahan, suku cadang, dan bahan periferal. Kami menyediakan layanan pemeliharaan teknis dan konsultasi, menampilkan mesin presisi Taiwan Ronghua untuk industri fabrikasi logam di seluruh dunia.",
            features: {
                quality: {
                    title: "Peralatan Berkualitas",
                    desc: "Peralatan pemrosesan baja profesional dari produsen terpercaya, termasuk mesin Taiwan Ronghua."
                },
                service: {
                    title: "Layanan Profesional",
                    desc: "Dukungan penjualan komprehensif dengan konsultasi teknis, panduan pemeliharaan dan pasokan suku cadang."
                },
                support: {
                    title: "Dukungan Lokal",
                    desc: "Berbasis di Shenzhen dengan pemahaman mendalam tentang kebutuhan pasar regional dan kemampuan respons cepat."
                }
            }
        },
        
        // Produk
        products: {
            title: "Portofolio Peralatan Pemrosesan Baja",
            subtitle: "Rangkaian lengkap sistem pemotongan presisi, mesin slitting Taiwan Ronghua, dan peralatan pemrosesan baja untuk fabrikasi logam dan aplikasi industri",
            items: {
                steelPlate: {
                    title: "Peralatan Pemrosesan Pelat Baja",
                    desc: "Rangkaian lengkap peralatan pemrosesan pelat baja termasuk mesin potong, peralatan tambahan dan suku cadang.",
                    features: ["Berbagai ketebalan pelat baja", "Dukungan teknis profesional", "Peralatan kualitas terjamin"]
                },
                conveyor: {
                    title: "Sabuk Konveyor & Platform Bergerak",
                    desc: "Sistem konveyor industri, mesin pemilik gulungan baja dan kereta platform bergerak untuk penanganan material.",
                    features: ["Konstruksi tahan berat", "Konfigurasi yang dapat disesuaikan", "Operasi handal"]
                },
                ronghua: {
                    title: "Mesin Slitting Taiwan Ronghua",
                    desc: "Peralatan slitting gulungan baja profesional dan gunting terbang untuk pemrosesan material presisi dan operasi baja berkelanjutan.",
                    features: ["Kemampuan slitting kecepatan tinggi", "Pemotongan strip baja presisi", "Jaminan kualitas Taiwan"]
                }
            },
            learnMore: "Pelajari Lebih Lanjut"
        },
        
        // Fitur
        features: {
            title: "Mengapa Memilih Solusi Peralatan Punaise?",
            subtitle: "Komitmen kami terhadap distribusi peralatan berkualitas dan layanan profesional telah menjadikan kami mitra terpercaya untuk perusahaan pemrosesan baja di seluruh wilayah Guangdong.",
            items: {
                partnership: {
                    title: "Kemitraan Terpercaya",
                    desc: "Distributor resmi peralatan Taiwan Ronghua dengan dukungan teknis komprehensif dan cakupan garansi."
                },
                coverage: {
                    title: "Cakupan Regional",
                    desc: "Pengiriman efisien ke seluruh Provinsi Guangdong dan wilayah tetangga dengan dukungan teknis lokal."
                },
                consulting: {
                    title: "Konsultasi Teknis",
                    desc: "Layanan pemeliharaan dan konsultasi profesional dengan keahlian Manajer Fu dalam peralatan pemrosesan baja."
                }
            },
            stats: {
                quality: "Kualitas Peralatan",
                satisfaction: "Kepuasan Pelanggan",
                coverage: "Cakupan Regional"
            }
        },
        
        // Testimoni
        testimonials: {
            title: "Apa Kata Klien Kami",
            subtitle: "Dipercaya oleh pemimpin industri di seluruh dunia"
        },
        
        // Kontak
        contact: {
            title: "Hubungi Kami",
            subtitle: "Siap meningkatkan kemampuan pemrosesan baja Anda? Hubungi ahli Punaise untuk solusi peralatan pemrosesan pelat baja profesional dan mesin Taiwan Ronghua. Melayani klien sejak 2005.",
            form: {
                name: "Nama Lengkap *",
                email: "Alamat Email *",
                company: "Nama Perusahaan",
                phone: "Nomor Telepon",
                service: "Minat Layanan",
                selectProduct: "Pilih produk",
                message: "Pesan *",
                messagePlaceholder: "Silakan jelaskan kebutuhan Anda...",
                submit: "Kirim Pesan",
                services: {
                    plasma: "Pemotongan Plasma CNC",
                    laser: "Sistem Pemotongan Laser",
                    flame: "Peralatan Pemotongan Api",
                    consultation: "Konsultasi Teknis",
                    support: "Dukungan & Pemeliharaan"
                }
            },
            info: {
                address: "Alamat Perusahaan",
                phone: "Telepon",
                email: "Email"
            }
        },
        
        // Footer
        footer: {
            sections: {
                products: "Produk",
                services: "Layanan",
                company: "Perusahaan",
                resources: "Sumber Daya"
            },
            productLinks: ["Pemotongan Plasma CNC", "Sistem Pemotongan Laser", "Peralatan Pemotongan Api", "Aksesoris Pemotongan", "Solusi Kustom"],
            serviceLinks: ["Dukungan Teknis", "Instalasi", "Pemeliharaan", "Pelatihan", "Konsultasi"],
            companyLinks: ["Tentang Kami", "Karir", "Berita & Acara", "Studi Kasus", "Kontak"],
            resourceLinks: ["Dokumentasi", "Unduhan", "Makalah Teknis", "Webinar", "FAQ"],
            copyright: "© 2024 Shenzhen Punaise Mechanical and Electrical Equipment Co., Ltd. Semua hak dilindungi. | Kode Kredit Sosial Terpadu: 914403007703327657",
            legal: {
                privacy: "Kebijakan Privasi",
                terms: "Syarat Layanan",
                cookie: "Kebijakan Cookie"
            }
        }
    }
};

// Language Manager Class
class LanguageManager {
    constructor() {
        this.currentLang = localStorage.getItem('preferredLanguage') || 'en';
        this.translations = translations;
    }
    
    // Initialize language system
    init() {
        this.updateLanguage(this.currentLang);
        this.bindLanguageSelector();
        this.updateLanguageSelector();
    }
    
    // Update all text content based on selected language
    updateLanguage(lang) {
        this.currentLang = lang;
        localStorage.setItem('preferredLanguage', lang);
        
        const t = this.translations[lang];
        
        // Update navigation
        this.updateNavigation(t.nav);
        
        // Update hero section
        this.updateHeroSection(t.hero);
        
        // Update about section
        this.updateAboutSection(t.about);
        
        // Update products section
        this.updateProductsSection(t.products);
        
        // Update features section
        this.updateFeaturesSection(t.features);
        
        // Update testimonials section
        this.updateTestimonialsSection(t.testimonials);
        
        // Update contact section
        this.updateContactSection(t.contact);
        
        // Update footer
        this.updateFooter(t.footer);
        
        // Update document language
        document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
        document.documentElement.setAttribute('data-lang', lang);
        
        // Update page title and meta description
        this.updateMetaData(lang);
    }
    
    // Update navigation menu
    updateNavigation(navTranslations) {
        const navLinks = document.querySelectorAll('.nav-link');
        const navItems = ['home', 'about', 'products', 'features', 'contact'];
        
        navLinks.forEach((link, index) => {
            if (navItems[index]) {
                link.textContent = navTranslations[navItems[index]];
            }
        });
    }
    
    // Update hero section
    updateHeroSection(heroTranslations) {
        const heroTitle = document.querySelector('.hero-title');
        const heroSubtitle = document.querySelector('.hero-subtitle');
        const buttons = document.querySelectorAll('.hero-buttons .btn');
        const statLabels = document.querySelectorAll('.stat-label');
        const scrollIndicator = document.querySelector('.scroll-indicator span');
        
        if (heroTitle) heroTitle.innerHTML = heroTranslations.title;
        if (heroSubtitle) heroSubtitle.textContent = heroTranslations.subtitle;
        
        if (buttons[0]) buttons[0].textContent = heroTranslations.getQuote;
        if (buttons[1]) {
            buttons[1].innerHTML = '<i class="fas fa-play"></i> ' + heroTranslations.watchDemo;
        }
        
        if (statLabels[0]) statLabels[0].textContent = heroTranslations.stats.partners;
        if (statLabels[1]) statLabels[1].textContent = heroTranslations.stats.experience;
        if (statLabels[2]) statLabels[2].textContent = heroTranslations.stats.quality;
        
        if (scrollIndicator) scrollIndicator.textContent = heroTranslations.scrollDown;
    }
    
    // Update about section
    updateAboutSection(aboutTranslations) {
        const aboutTitle = document.querySelector('#about .section-header h2');
        const aboutDesc = document.querySelector('#about .section-header p');
        const featureCards = document.querySelectorAll('#about .feature-card');
        
        if (aboutTitle) aboutTitle.textContent = aboutTranslations.title;
        if (aboutDesc) aboutDesc.textContent = aboutTranslations.description;
        
        const features = ['quality', 'service', 'support'];
        featureCards.forEach((card, index) => {
            const title = card.querySelector('h3');
            const desc = card.querySelector('p');
            const feature = features[index];
            
            if (title && feature) {
                title.textContent = aboutTranslations.features[feature].title;
            }
            if (desc && feature) {
                desc.textContent = aboutTranslations.features[feature].desc;
            }
        });
    }
    
    // Update products section
    updateProductsSection(productsTranslations) {
        const productsTitle = document.querySelector('#products .section-header h2');
        const productsSubtitle = document.querySelector('#products .section-header p');
        const productCards = document.querySelectorAll('#products .product-card');
        const learnMoreBtns = document.querySelectorAll('#products .btn-outline');
        
        if (productsTitle) productsTitle.textContent = productsTranslations.title;
        if (productsSubtitle) productsSubtitle.textContent = productsTranslations.subtitle;
        
        learnMoreBtns.forEach(btn => {
            btn.textContent = productsTranslations.learnMore;
        });
        
        // Update product cards based on their titles
        productCards.forEach(card => {
            const title = card.querySelector('h3');
            const desc = card.querySelector('.product-info > p');
            const features = card.querySelectorAll('.product-features li');
            
            if (title) {
                let productKey = '';
                if (title.textContent.includes('Steel Plate') || title.textContent.includes('钢板加工')) {
                    productKey = 'steelPlate';
                } else if (title.textContent.includes('Conveyor') || title.textContent.includes('输送带')) {
                    productKey = 'conveyor';
                } else if (title.textContent.includes('Ronghua') || title.textContent.includes('荣华')) {
                    productKey = 'ronghua';
                }
                
                if (productKey) {
                    title.textContent = productsTranslations.items[productKey].title;
                    if (desc) desc.textContent = productsTranslations.items[productKey].desc;
                    
                    features.forEach((feature, idx) => {
                        if (productsTranslations.items[productKey].features[idx]) {
                            feature.innerHTML = '<i class="fas fa-check"></i> ' + productsTranslations.items[productKey].features[idx];
                        }
                    });
                }
            }
        });
    }
    
    // Update features section
    updateFeaturesSection(featuresTranslations) {
        const featuresTitle = document.querySelector('#features h2');
        const featuresSubtitle = document.querySelector('#features .features-text > p');
        const featureItems = document.querySelectorAll('#features .feature-item');
        const chartLabels = document.querySelectorAll('.chart-label');
        
        if (featuresTitle) featuresTitle.textContent = featuresTranslations.title;
        if (featuresSubtitle) featuresSubtitle.textContent = featuresTranslations.subtitle;
        
        const featureKeys = ['partnership', 'coverage', 'consulting'];
        featureItems.forEach((item, index) => {
            const title = item.querySelector('h4');
            const desc = item.querySelector('p');
            const key = featureKeys[index];
            
            if (title && key) {
                title.textContent = featuresTranslations.items[key].title;
            }
            if (desc && key) {
                desc.textContent = featuresTranslations.items[key].desc;
            }
        });
        
        // Update chart labels
        if (chartLabels[0]) chartLabels[0].textContent = featuresTranslations.stats.quality;
        if (chartLabels[1]) chartLabels[1].textContent = featuresTranslations.stats.satisfaction;
        if (chartLabels[2]) chartLabels[2].textContent = featuresTranslations.stats.coverage;
    }
    
    // Update testimonials section
    updateTestimonialsSection(testimonialsTranslations) {
        const testimonialsTitle = document.querySelector('.testimonials .section-header h2');
        const testimonialsSubtitle = document.querySelector('.testimonials .section-header p');
        
        if (testimonialsTitle) testimonialsTitle.textContent = testimonialsTranslations.title;
        if (testimonialsSubtitle) testimonialsSubtitle.textContent = testimonialsTranslations.subtitle;
    }
    
    // Update contact section
    updateContactSection(contactTranslations) {
        const contactTitle = document.querySelector('#contact h2');
        const contactSubtitle = document.querySelector('#contact .contact-info > p');
        
        if (contactTitle) contactTitle.textContent = contactTranslations.title;
        if (contactSubtitle) contactSubtitle.textContent = contactTranslations.subtitle;
        
        // Update form labels
        const formLabels = document.querySelectorAll('#contactForm label');
        const labelKeys = ['name', 'email', 'company', 'phone', 'service', 'message'];
        
        formLabels.forEach((label, index) => {
            if (labelKeys[index]) {
                label.textContent = contactTranslations.form[labelKeys[index]];
            }
        });
        
        // Update placeholder
        const messageTextarea = document.querySelector('#message');
        if (messageTextarea) {
            messageTextarea.placeholder = contactTranslations.form.messagePlaceholder;
        }
        
        // Update submit button
        const submitBtn = document.querySelector('#contactForm button[type="submit"]');
        if (submitBtn) {
            submitBtn.textContent = contactTranslations.form.submit;
        }
        
        // Update service options
        const serviceSelect = document.querySelector('#service');
        if (serviceSelect) {
            serviceSelect.options[0].textContent = contactTranslations.form.selectProduct;
            serviceSelect.options[1].textContent = contactTranslations.form.services.plasma;
            serviceSelect.options[2].textContent = contactTranslations.form.services.laser;
            serviceSelect.options[3].textContent = contactTranslations.form.services.flame;
            serviceSelect.options[4].textContent = contactTranslations.form.services.consultation;
            serviceSelect.options[5].textContent = contactTranslations.form.services.support;
        }
        
        // Update contact info headers
        const contactHeaders = document.querySelectorAll('.contact-text h4');
        if (contactHeaders[0]) contactHeaders[0].textContent = contactTranslations.info.address;
        if (contactHeaders[1]) contactHeaders[1].textContent = contactTranslations.info.phone;
        if (contactHeaders[2]) contactHeaders[2].textContent = contactTranslations.info.email;
    }
    
    // Update footer
    updateFooter(footerTranslations) {
        // Update section headers
        const footerHeaders = document.querySelectorAll('.footer-section h4');
        if (footerHeaders[0]) footerHeaders[0].textContent = footerTranslations.sections.products;
        if (footerHeaders[1]) footerHeaders[1].textContent = footerTranslations.sections.services;
        if (footerHeaders[2]) footerHeaders[2].textContent = footerTranslations.sections.company;
        if (footerHeaders[3]) footerHeaders[3].textContent = footerTranslations.sections.resources;
        
        // Update copyright
        const copyright = document.querySelector('.footer-bottom-content p');
        if (copyright) {
            copyright.textContent = footerTranslations.copyright;
        }
        
        // Update legal links
        const legalLinks = document.querySelectorAll('.footer-links a');
        if (legalLinks[0]) legalLinks[0].textContent = footerTranslations.legal.privacy;
        if (legalLinks[1]) legalLinks[1].textContent = footerTranslations.legal.terms;
        if (legalLinks[2]) legalLinks[2].textContent = footerTranslations.legal.cookie;
    }
    
    // Bind language selector
    bindLanguageSelector() {
        const languageSelector = document.getElementById('language');
        if (languageSelector) {
            languageSelector.addEventListener('change', (e) => {
                const selectedLang = e.target.value;
                this.updateLanguage(selectedLang);
                
                // Show notification
                const messages = {
                    en: 'Switched to English version',
                    zh: '已切换到中文版',
                    es: 'Cambiado a versión en español',
                    pt: 'Alterado para versão em português',
                    th: 'เปลี่ยนเป็นเวอร์ชันภาษาไทย',
                    vi: 'Đã chuyển sang phiên bản tiếng Việt',
                    id: 'Beralih ke versi bahasa Indonesia'
                };
                
                const message = messages[selectedLang] || messages.en;
                
                if (typeof showNotification === 'function') {
                    showNotification(message, 'success');
                }
            });
        }
    }
    
    // Update language selector to current language
    updateLanguageSelector() {
        const languageSelector = document.getElementById('language');
        if (languageSelector) {
            // Clear existing options
            languageSelector.innerHTML = '';
            
            // Add all language options
            const languages = [
                { value: 'en', text: 'EN' },
                { value: 'zh', text: '中文' },
                { value: 'es', text: 'ES' },
                { value: 'pt', text: 'PT' },
                { value: 'th', text: 'TH' },
                { value: 'vi', text: 'VI' },
                { value: 'id', text: 'ID' }
            ];
            
            languages.forEach(lang => {
                const option = document.createElement('option');
                option.value = lang.value;
                option.textContent = lang.text;
                languageSelector.appendChild(option);
            });
            
            // Set current language
            languageSelector.value = this.currentLang;
        }
    }
    
    // Update page metadata
    updateMetaData(lang) {
        const titles = {
            en: "CNC Steel Cutting Equipment Manufacturer | Shenzhen Punaise Mechanical Equipment Co., Ltd.",
            zh: "CNC钢板切割设备制造商 | 深圳市普耐斯机电设备有限公司",
            es: "Fabricante de Equipos de Corte de Acero CNC | Shenzhen Punaise Mechanical Equipment Co., Ltd.",
            pt: "Fabricante de Equipamentos de Corte de Aço CNC | Shenzhen Punaise Mechanical Equipment Co., Ltd.",
            th: "ผู้ผลิตอุปกรณ์ตัดเหล็ก CNC | บริษัท เซินเจิ้น ปูไนส์ เมคคานิคอล อีควิปเมนท์ จำกัด",
            vi: "Nhà sản xuất Thiết bị Cắt Thép CNC | Công ty TNHH Thiết bị Cơ khí và Điện Shenzhen Punaise",
            id: "Produsen Peralatan Pemotong Baja CNC | Shenzhen Punaise Mechanical Equipment Co., Ltd."
        };
        
        const descriptions = {
            en: "Shenzhen Punaise Mechanical and Electrical Equipment Co., Ltd. - Professional steel plate cutting equipment manufacturer since 2005. CNC plasma, laser cutting systems with precision engineering.",
            zh: "深圳市普耐斯机电设备有限公司 - 自2005年以来专业的钢板切割设备制造商。CNC等离子体、激光切割系统，精密工程技术。",
            es: "Shenzhen Punaise Mechanical and Electrical Equipment Co., Ltd. - Fabricante profesional de equipos de corte de placas de acero desde 2005. Sistemas de corte por plasma CNC, láser con ingeniería de precisión.",
            pt: "Shenzhen Punaise Mechanical and Electrical Equipment Co., Ltd. - Fabricante profissional de equipamentos de corte de chapas de aço desde 2005. Sistemas de corte a plasma CNC, laser com engenharia de precisão.",
            th: "บริษัท เซินเจิ้น ปูไนส์ เมคคานิคอล แอนด์ อิเล็กทริคอล อีควิปเมนท์ จำกัด - ผู้ผลิตอุปกรณ์ตัดแผ่นเหล็กมืออาชีพตั้งแต่ปี 2005 ระบบตัดพลาสมา CNC เลเซอร์ด้วยวิศวกรรมความแม่นยำ",
            vi: "Công ty TNHH Thiết bị Cơ khí và Điện Shenzhen Punaise - Nhà sản xuất thiết bị cắt tấm thép chuyên nghiệp từ năm 2005. Hệ thống cắt plasma CNC, laser với kỹ thuật chính xác.",
            id: "Shenzhen Punaise Mechanical and Electrical Equipment Co., Ltd. - Produsen peralatan pemotong pelat baja profesional sejak 2005. Sistem pemotongan plasma CNC, laser dengan teknik presisi."
        };
        
        // Update title
        document.title = titles[lang] || titles.en;
        
        // Update meta description
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.content = descriptions[lang] || descriptions.en;
        }
        
        // Update Open Graph title and description
        const ogTitle = document.querySelector('meta[property="og:title"]');
        const ogDescription = document.querySelector('meta[property="og:description"]');
        
        if (ogTitle) ogTitle.content = titles[lang] || titles.en;
        if (ogDescription) ogDescription.content = descriptions[lang] || descriptions.en;
        
        // Update Twitter Card
        const twitterTitle = document.querySelector('meta[property="twitter:title"]');
        const twitterDescription = document.querySelector('meta[property="twitter:description"]');
        
        if (twitterTitle) twitterTitle.content = titles[lang] || titles.en;
        if (twitterDescription) twitterDescription.content = descriptions[lang] || descriptions.en;
    }
}

// Initialize language manager when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const langManager = new LanguageManager();
    langManager.init();
});

// Export for use in other scripts
window.LanguageManager = LanguageManager;