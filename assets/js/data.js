// Manifest de 17 proyectos
const BASE = "FOTOS FINALES";

const PROJECTS = [
  {
    id: "cabanas",
    title: "Cabañas",
    folder: "CABAÑAS",
    portada: "PORTADA/C002.png",
    horizontal: ["HORIZONTAL/C001.png", "HORIZONTAL/C002.png", "HORIZONTAL/C003.png"],
    vertical:   ["VERTICAL/C01.png", "VERTICAL/C02.png", "VERTICAL/C03.png"],
    video3d: "VIDEO/CV3.mp4",
    info: {
      categoria: "Comercial",
      ubicacion: "Oiba, Santander",
      dimensiones: "38 m²",
      descripcion: "Refugio campestre diseñado para conectar profundamente con la naturaleza. La arquitectura de estas cabañas reinterpreta el estilo tradicional mediante el uso de techos a dos aguas y acabados limpios. El gran protagonista es el ventanal de madera que abre el área social hacia un balcón exterior, permitiendo que el paisaje se convierta en parte del diseño interior. Una propuesta arquitectónica que optimiza el espacio y el presupuesto a través de un diseño modular eficiente."
    }
  },
  {
    id: "d1",
    title: "D1",
    folder: "D1",
    portada: "PORTADA/D1001.png",
    horizontal: ["HORIZONTAL/D1001.png", "HORIZONTAL/D1002.png"],
    vertical:   ["VERTICAL/D101.png", "VERTICAL/D102.png"],
    info: {
      categoria: "Comercial",
      ubicacion: "Curití, Santander",
      dimensiones: "375 m²",
      descripcion: "Proyecto comercial diseñado para fusionar la identidad corporativa de la marca con una arquitectura moderna de líneas limpias. La volumetría destaca por sus grandes ventanales y una celosía vertical que aporta ritmo y protección solar a la circulación. El desarrollo abarcó un acompañamiento técnico total: desde la ejecución del estudio de suelos y el cálculo estructural preciso, hasta la gestión exitosa de la licencia de construcción, garantizando una obra segura, viable y ajustada a la normativa."
    }
  },
  {
    id: "edificio-espinosa",
    title: "Edificio Espinosa",
    folder: "EDIFICIO ESPINOSA",
    portada: "PORTADA/ESPINOZA004.png",
    horizontal: [
      "HORIZONTAL/ESPINOZA001.png","HORIZONTAL/ESPINOZA002.png","HORIZONTAL/ESPINOZA003.png",
      "HORIZONTAL/ESPINOZA004.png","HORIZONTAL/ESPINOZA005.png","HORIZONTAL/ESPINOZA006.png",
      "HORIZONTAL/ESPINOZA007.png","HORIZONTAL/ESPINOZA008.png"
    ],
    vertical: [
      "VERTICAL/ESPINOZA01.png","VERTICAL/ESPINOZA02.png","VERTICAL/ESPINOZA03.png",
      "VERTICAL/ESPINOZA04.png","VERTICAL/ESPINOZA05.png","VERTICAL/ESPINOZA06.png",
      "VERTICAL/ESPINOZA07.png"
    ],
    info: {
      categoria: "Residencial",
      ubicacion: "Oiba, Santander",
      dimensiones: "309 m²",
      descripcion: "Proyecto residencial de tres niveles que destaca por una fachada de estilo industrial moderno. El diseño logra un equilibrio visual perfecto al contrastar la calidez y textura del ladrillo a la vista con la limpieza de los grandes ventanales en perfilería negra. Más allá de su impacto estético, este proyecto cuenta con una planificación técnica exhaustiva, incluyendo el diseño arquitectónico, diseño de interiores, estudio de suelos, el cálculo de cantidades de obra (acero y concreto) y Análisis de Precios Unitarios (APU), garantizando una ejecución estructurada y fiel al presupuesto."
    }
  },
  {
    id: "proyecto-comercial-restaurante",
    title: "Restaurante & Urbanismo",
    folder: "PROYECTO COMERCIAL INTEGRADO  RESTAURANTE & URBANISMO",
    portada: "PORTADA/PCI008.png",
    horizontal: [
      "HORIZONTAL/PCI001.png","HORIZONTAL/PCI002.png","HORIZONTAL/PCI003.png","HORIZONTAL/PCI004.png",
      "HORIZONTAL/PCI005.png","HORIZONTAL/PCI006.png","HORIZONTAL/PCI007.png","HORIZONTAL/PCI008.png"
    ],
    vertical: [
      "VERTICAL/PCI01.png","VERTICAL/PCI02.png","VERTICAL/PCI03.png",
      "VERTICAL/PCI04.png","VERTICAL/PCI05.png","VERTICAL/PCI06.png"
    ],
    info: {
      categoria: "Comercial",
      ubicacion: "Oiba, Santander",
      dimensiones: "409 m²",
      descripcion: "Proyecto comercial de gran escala que redefine la experiencia gastronómica al integrar restaurante, cafetería y zonas de servicio en un solo ecosistema arquitectónico. El diseño desdibuja los límites entre el interior y el espacio público mediante una cuidada propuesta de urbanismo. Su volumetría se caracteriza por una cubierta imponente y grandes ventanales, materializada a través de texturas honestas como el ladrillo, el concreto a la vista y el blanco puro. Una obra contemporánea, funcional y de alto impacto urbano."
    }
  },
  {
    id: "vcm",
    title: "Vivienda Campestre Moderna",
    folder: "VIVIENDA CAMPESTRE MODERNA",
    portada: "PORTADA/VCM002.png",
    horizontal: ["HORIZONTAL/VCM001.png","HORIZONTAL/VCM002.png","HORIZONTAL/VCM003.png"],
    vertical:   ["VERTICAL/VCM01.png","VERTICAL/VCM02.png","VERTICAL/VCM03.png"],
    info: {
      categoria: "Residencial",
      ubicacion: "Mesa de los Santos, Santander",
      dimensiones: "300 m²",
      descripcion: "Proyecto residencial de estilo moderno campestre donde la pureza geométrica se encuentra con la materialidad honesta. El diseño maximiza la conexión visual con el exterior mediante ventanales de piso a techo, logrando un equilibrio estructural entre la solidez de la piedra y la ligereza del vidrio. Una propuesta arquitectónica de alto impacto estético, planificada estratégicamente para ser completamente viable y construible."
    }
  },
  {
    id: "vcmv",
    title: "Vivienda Moderna Vacacional",
    folder: "VIVIENDA CAMPESTRE MODERNA VACACIONAL",
    portada: "PORTADA/VCM002.png",
    horizontal: ["HORIZONTAL/VCM001.png","HORIZONTAL/VCM002.png"],
    vertical:   ["VERTICAL/VCM01.png","VERTICAL/VCM02.png"],
    info: {
      categoria: "Residencial",
      ubicacion: "Oiba, Santander",
      dimensiones: "400 m²",
      descripcion: "Vivienda de dos niveles que destaca por su impecable limpieza visual y equilibrio geométrico. El diseño se articula a través del contraste entre volúmenes blancos minimalistas y un cuerpo central revestido en textura de madera, aportando calidez y jerarquía a la fachada. Los amplios ventanales y las barandas en vidrio garantizan espacios interiores luminosos, creando una obra moderna, elegante y atemporal."
    }
  },
  {
    id: "v2p",
    title: "Vivienda Dos Pisos",
    folder: "VIVIENDA 2 PISOS",
    portada: "PORTADA/V2P001.png",
    horizontal: ["HORIZONTAL/V2P001.png","HORIZONTAL/V2P002.png"],
    vertical:   ["VERTICAL/V2P01.png","VERTICAL/V2P02.png"],
    info: {
      categoria: "Residencial",
      ubicacion: "Hato, Santander",
      dimensiones: "107 m²",
      descripcion: "Vivienda de dos niveles concebida bajo los principios del minimalismo y la geometría pura. El diseño aprovecha su condición de lote esquinero para generar fachadas limpias y de gran impacto visual. El contraste entre los volúmenes blancos absolutos, la perfilería negra de los amplios ventanales y el acento vertical texturizado, crea una composición arquitectónica elegante y atemporal, diseñada para maximizar la entrada de luz natural en cada espacio."
    }
  },
  {
    id: "vcb",
    title: "Vivienda Campestre Bifamiliar",
    folder: "VIVIENDA CAMPESTRE BIFAMILIAR",
    portada: "PORTADA/VCB001.png",
    horizontal: ["HORIZONTAL/VCB001.png","HORIZONTAL/VCB002.png","HORIZONTAL/VCB003.png","HORIZONTAL/VCB004.png","HORIZONTAL/VCB005.png"],
    vertical:   ["VERTICAL/VCB01.png","VERTICAL/VCB02.png","VERTICAL/VCB03.png","VERTICAL/VCB04.png"],
    info: {
      categoria: "Residencial",
      ubicacion: "Oiba, Santander",
      dimensiones: "260 m²",
      descripcion: "Propuesta residencial de líneas contemporáneas pensada para equilibrar un alto impacto visual con la viabilidad constructiva. El proyecto resuelve eficientemente los accesos y parqueos en el primer nivel, mientras reserva el segundo para zonas íntimas con un amplio balcón frontal. Fiel a nuestra filosofía, esta fachada combina acabados en piedra, madera y metal. La integración de una terraza cubierta con pérgola y amplios ventanales garantiza espacios interiores luminosos y conectados con el exterior. Una obra de arquitectura moderna, cálida y atemporal."
    }
  },
  {
    id: "vcf",
    title: "Vivienda Campestre Familiar",
    folder: "VIVIENDA CAMPESTRE FAMILIAR",
    portada: "PORTADA/VCF001.png",
    horizontal: ["HORIZONTAL/VCF001.png","HORIZONTAL/VCF002.png","HORIZONTAL/VCF003.png","HORIZONTAL/VCF004.png"],
    vertical:   ["VERTICAL/VCF01.png","VERTICAL/VCF02.png","VERTICAL/VCF03.png","VERTICAL/VCF04.png"],
    info: {
      categoria: "Residencial",
      ubicacion: "Socorro, Santander",
      dimensiones: "122 m²",
      descripcion: "El verdadero lujo en una casa de campo es la tranquilidad.  En lugar de usar muros pesados, optamos por celosías de madera que abrazan el espacio, aportando textura y calidez natural mientras dejan que la luz fluya libremente. Es un ambiente pensado para vivirse despacio, con un diseño contemporáneo que respeta la esencia del hogar."
    }
  },
  {
    id: "vcf2",
    title: "Vivienda Campestre Familiar II",
    folder: "VIVIENDA CAMPESTRE FAMILIAR  02",
    portada: "PORTADA/VCF2002.png",
    horizontal: ["HORIZONTAL/VCF2001.png","HORIZONTAL/VCF2002.png","HORIZONTAL/VCF2003.png","HORIZONTAL/VCF2004.png"],
    vertical:   ["VERTICAL/VCF201.png","VERTICAL/VCF202.png","VERTICAL/VCF203.png","VERTICAL/VCF204.png"],
    info: {
      categoria: "Residencial",
      ubicacion: "Socorro, Santander",
      dimensiones: "122 m²",
      descripcion: "Diseño pensado para aprovechar al máximo cada metro cuadrado. Este proyecto convierte un reto arquitectónico —el techo inclinado— en su mayor virtud. La distribución integra de forma fluida la zona de descanso justo bajo la entrada de luz natural. El uso de texturas cálidas y maderas claras crea una atmósfera íntima y relajante, demostrando que el buen diseño puede convertir cualquier rincón en el lugar favorito del hogar."
    }
  },
  {
    id: "vcp",
    title: "Vivienda Campestre Pequeña",
    folder: "VIVIENDA CAMPESTRE PEQUEÑA",
    portada: "PORTADA/VCP002.png",
    horizontal: ["HORIZONTAL/VCP001.png","HORIZONTAL/VCP002.png","HORIZONTAL/VCP003.png"],
    vertical:   ["VERTICAL/VCP01.png","VERTICAL/VCP02.png","VERTICAL/VCP03.png"],
    info: {
      categoria: "Residencial",
      ubicacion: "Oiba, Santander",
      dimensiones: "106 m²",
      descripcion: "Refugio de descanso que reinterpreta la cabaña tradicional bajo una estética rústica contemporánea. El diseño de la fachada juega con la asimetría de sus techos inclinados y el contraste entre la solidez de la piedra natural, la limpieza del blanco y la ligereza de los grandes ventanales. Este anteproyecto fue el resultado de unificar distintas visiones familiares en una propuesta de alto valor arquitectónico. Fiel a nuestra filosofía, la casa fue proyectada estructural y económicamente para ser construida por etapas, permitiendo a los clientes materializar su sueño a su propio ritmo."
    }
  },
  {
    id: "vcv",
    title: "Vivienda Campestre Vacacional",
    folder: "VIVIENDA CAMPESTRE VACACIONAL",
    portada: "PORTADA/VCV001.png",
    horizontal: ["HORIZONTAL/VCV001.png","HORIZONTAL/VCV002.png","HORIZONTAL/VCV003.png","HORIZONTAL/VCV004.png"],
    vertical:   ["VERTICAL/VCV01.png","VERTICAL/VCV02.png","VERTICAL/VCV03.png","VERTICAL/VCV04.png"],
    info: {
      categoria: "Residencial",
      ubicacion: "Oiba, Santander",
      dimensiones: "400 m²",
      descripcion: "Vivienda unifamiliar de estilo moderno cálido que equilibra una fachada de alto impacto con un oasis privado en su interior. La volumetría exterior destaca por el contraste armónico entre muros blancos, acentos en ladrillo a la vista y texturas de madera. En su interior, el diseño se abre hacia una zona social íntima con piscina, deck de madera y pérgola. Un proyecto concebido estructural y presupuestalmente para ser totalmente viable, ofreciendo a la familia un refugio estético, funcional y listo para construirse."
    }
  },
  {
    id: "vmc",
    title: "Vivienda Multifamiliar Contemporánea",
    folder: "VIVIENDA MULTIFAMILIAR CONTEMPORÁNEA",
    portada: "PORTADA/VMC001.png",
    horizontal: ["HORIZONTAL/VMC001.png"],
    vertical:   ["VERTICAL/VMC01.png"],
    info: {
      categoria: "Residencial",
      ubicacion: "Socorro, Santander",
      dimensiones: "168 m²",
      descripcion: "Diseño residencial enfocado en optimizar el espacio vertical bajo una estética de líneas limpias y materiales honestos. El proyecto resuelve eficientemente el acceso y parqueo en el primer nivel, áreas habitables iluminadas en el centro, y una terraza cubierta en el remate. Fiel a nuestra filosofía, esta combinación de ladrillo, metal oscuro y acabados lisos no solo busca un alto impacto visual, sino que está planificada con total rigor estructural para garantizar una construcción viable y eficiente."
    }
  },
  {
    id: "dic",
    title: "Diseño Interior Cafetería",
    folder: "DISEÑO INTERIOR CAFETERÍA",
    portada: "PORTADA/DIC001.png",
    horizontal: ["HORIZONTAL/DIC001.png","HORIZONTAL/DIC002.png"],
    vertical:   ["VERTICAL/DIC01.png","VERTICAL/DIC02.png"],
    info: {
      categoria: "Diseño de interior",
      ubicacion: "Oiba, Santander",
      dimensiones: "35 m²",
      descripcion: "Propuesta de diseño interior enfocada en crear una atmósfera cálida y acogedora. El proyecto transforma un espacio longitudinal mediante una paleta de colores luminosa, fusionando bases blancas con acentos en tonos salmón y la textura natural de la madera. Se implementó una zonificación estratégica a través de mobiliario a medida y celosías, logrando diferentes ambientes de consumo —desde mesas íntimas hasta barras compartidas— que enriquecen la experiencia del cliente."
    }
  },
  {
    id: "dic2",
    title: "Diseño Interior Cafetería II",
    folder: "DISEÑO INTERIOR DE CAFETERÍA 02",
    portada: "PORTADA/DIC2002.png",
    horizontal: ["HORIZONTAL/DIC2001.png","HORIZONTAL/DIC2002.png"],
    vertical:   ["VERTICAL/DIC201.png","VERTICAL/DIC202.png"],
    info: {
      categoria: "Diseño de interior",
      ubicacion: "Oiba, Santander",
      dimensiones: "30 m²",
      descripcion: "Transformación integral de un local gastronómico en una cafetería de diseño. El proyecto reinterpreta la amplitud del espacio existente apostando por un estilo industrial contemporáneo, donde las texturas robustas y los materiales honestos toman el protagonismo. La distribución se reorganizó estratégicamente para conectar de forma fluida el ambiente interior con una zona de asientos al aire libre, creando un entorno urbano, dinámico y con mucho carácter."
    }
  },
  {
    id: "dic-colegio",
    title: "Diseño Interior Colegio",
    folder: "DISEÑO INTERIOR EN COLEGIO",
    portada: "PORTADA/DIC004.png",
    horizontal: ["HORIZONTAL/DIC002.png","HORIZONTAL/DIC003.png","HORIZONTAL/DIC004.png","HORIZONTAL/DIC005.png","HORIZONTAL/DIC006.png"],
    vertical:   ["VERTICAL/DIC01.png","VERTICAL/DIC02.png","VERTICAL/DIC03.png","VERTICAL/DIC04.png","VERTICAL/DIC05.png"],
    info: {
      categoria: "Educación",
      ubicacion: "Oiba, Santander",
      dimensiones: "200 m²",
      descripcion: "Diseño integral de un salón de clases tradicional, transformado en un ecosistema educativo tipo co-working. El proyecto rompe el paradigma convencional al integrar mobiliario modular, una zona de cafetería y un área de lounge. Mediante un estilo industrial contemporáneo que contrasta techos en madera, pisos oscuros y acentos de color vibrante, se logró un espacio funcional que fomenta la creatividad, la colaboración y el bienestar de los estudiantes."
    }
  },
  {
    id: "dih",
    title: "Habitación para un Bebé",
    folder: "DISEÑO INTERIOR HABITACIÓN PARA UN BEBÉ",
    portada: "PORTADA/DIH001.png",
    horizontal: ["HORIZONTAL/DIH001.png"],
    vertical:   ["VERTICAL/DIH01.png"],
    info: {
      categoria: "Diseño de interior",
      ubicacion: "Oiba, Santander",
      dimensiones: "15 m²",
      descripcion: "Intervención de diseño interior que optimiza un espacio reducido mediante mobiliario a gran escala diseñado a medida. Este proyecto unifica almacenamiento inteligente en tonos pastel suaves con un mural personalizado, bajo una estética limpia y funcional que prioriza la luz natural para el bienestar del bebé."
    }
  },
  {
    id: "trabajos-empresa",
    title: "Trabajos en Empresa",
    folder: "TRABAJOS EN EMPRESA",
    portada: "citu.jpg",
    horizontal: [],
    vertical: [],
    timeline: [
      {
        fecha: "2018 · Citu",
        imgs: [
          "2018 Citu/WhatsApp Image 2026-04-22 at 10.22.11 AM.jpeg",
          "2018 Citu/WhatsApp Image 2026-04-22 at 10.22.11 AM (1).jpeg"
        ]
      },
      {
        fecha: "2019 · Colegio",
        imgs: [
          "2019 Colegio/IMG_20200806_090225_115.jpg",
          "2019 Colegio/IMG-20200806-WA0008.jpg",
          "2019 Colegio/IMG_20200908_173548.jpg",
          "2019 Colegio/IMG_20200916_175432.jpg",
          "2019 Colegio/IMG-20200905-WA0015.jpg"
        ]
      },
      {
        fecha: "2020 · Vivienda VIS",
        imgs: [
          "2020 vivienda VIS/IMG_20200722_133417.jpg",
          "2020 vivienda VIS/IMG_20200728_113327.jpg",
          "2020 vivienda VIS/IMG_20200803_145907.jpg",
          "2020 vivienda VIS/IMG-20200808-WA0006.jpg",
          "2020 vivienda VIS/IMG_20200908_152551.jpg",
          "2020 vivienda VIS/IMG_20200925_143900.jpg"
        ]
      },
      {
        fecha: "2021 · Urbanismo",
        imgs: [
          "2021 Urbanismo/IMG-20201130-WA0046.jpg",
          "2021 Urbanismo/IMG-20210117-WA0018.jpg",
          "2021 Urbanismo/IMG-20210120-WA0003.jpg",
          "2021 Urbanismo/IMG-20210126-WA0003.jpg",
          "2021 Urbanismo/IMG-20210216-WA0020.jpg"
        ]
      },
      {
        fecha: "2022 · Centro Comercial",
        imgs: [
          "2022 Centro comercial/IMG-20210208-WA0048.jpg",
          "2022 Centro comercial/IMG_20210126_101021.jpg",
          "2022 Centro comercial/IMG_20210624_165540_801.jpg",
          "2022 Centro comercial/IMG-20210802-WA0027.jpg",
          "2022 Centro comercial/IMG-20210901-WA0027.jpg",
          "2022 Centro comercial/IMG-20230911-WA0013.jpg"
        ]
      },
      {
        fecha: "2023 · Posventas",
        imgs: [
          "2023 Posventas/IMG-20221102-WA0014.jpg",
          "2023 Posventas/IMG-20221121-WA0052.jpg",
          "2023 Posventas/IMG-20230302-WA0037.jpg",
          "2023 Posventas/IMG-20230329-WA0010.jpg",
          "2023 Posventas/IMG-20230330-WA0004.jpg"
        ]
      },
      {
        fecha: "Portafolio",
        imgs: ["CARTAGENA.jpg", "HUERTO.jpg", "citu.jpg", "colegio.jpg"]
      }
    ],
    info: {
      categoria: "Experiencia profesional",
      ubicacion: "Colombia",
      dimensiones: "",
      descripcion: "Registro fotográfico de proyectos y actividades desarrolladas durante la trayectoria profesional en empresas del sector de la construcción y el diseño arquitectónico, organizado cronológicamente por año y especialidad."
    }
  }
];

function projectAssetUrl(project, relativePath) {
  return encodeURI(`${BASE}/${project.folder}/${relativePath}`);
}

const SERVICES = [
  {
    num: "01",
    title: "Licencias y Trámites Urbanísticos",
    desc: "Gestión integral de Licencias de Construcción (obra nueva, ampliación, modificación, reforzamiento estructural y demolición). Procesos de reconocimiento de edificaciones existentes. Trámites, radicaciones y seguimiento directo ante Planeación Municipal."
  },
  {
    num: "02",
    title: "Diseño Arquitectónico",
    desc: "Diseño arquitectónico residencial (vivienda unifamiliar y bifamiliar). Proyectos de remodelación y ampliación. Planimetría, detalles técnicos, modelado 3D y renders de alta calidad. Atención presencial o virtual a nivel nacional."
  },
  {
    num: "03",
    title: "Diseño Interior y Comercial",
    desc: "Diseño y distribución de espacios interiores residenciales. Conceptualización de locales comerciales y oficinas. Optimización de iluminación, circulación y espacialidad. Selección de paletas modernas y mobiliario fijo a medida."
  },
  {
    num: "04",
    title: "Propiedad Horizontal",
    desc: "Elaboración y estructuración de reglamentos de propiedad horizontal. Modificaciones y actualizaciones. Levantamientos arquitectónicos precisos, cuadros de áreas, coeficientes de copropiedad y planos oficiales para protocolización."
  },
  {
    num: "05",
    title: "Estudios de Suelos",
    desc: "Exploración y caracterización del terreno. Análisis de capacidad portante y condiciones del subsuelo. Recomendaciones técnicas precisas para el sistema de cimentación y prevención de riesgos geológicos."
  },
  {
    num: "06",
    title: "Cálculos Estructurales",
    desc: "Diseño y cálculo de estructuras sismorresistentes. Análisis de cargas para edificaciones nuevas o reforzamientos. Cálculo de cantidades de obra, APU, planos de despiece y detalles constructivos."
  }
];

const CONTACT = {
  email: "rangeljessicaviviana@gmail.com",
  whatsapp: "573112104849",
  whatsappDisplay: "+57 311 210 4849",
  ubicacion: "Oiba, Santander — Cobertura nacional",
  instagram: "arquitectura.jessicarangel"
};
