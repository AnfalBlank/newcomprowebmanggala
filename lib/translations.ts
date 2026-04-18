export const translations = {
  id: {
    common: {
      loading: "Memuat...",
      error: "Terjadi kesalahan",
      save: "Simpan",
      cancel: "Batal",
      delete: "Hapus",
      edit: "Edit",
      view_detail: "Lihat Detail",
      contact_us: "Hubungi Kami",
      learn_more: "Selengkapnya",
    },
    nav: {
      home: "Beranda",
      about: "Tentang Kami",
      products: "Produk",
      portfolio: "Portofolio",
      solutions: "Solusi",
      resource: "Sumber Daya",
      faq: "FAQ",
      blog: "Blog",
      contact: "Kontak",
    },
    hero: {
      title: "Fueling System & IT Solution Provider",
      subtitle: "Solusi Terintegrasi untuk Kebutuhan Industri Anda. Kami menyediakan teknologi terdepan dalam sistem bahan bakar dan solusi IT.",
      cta: "Konsultasi Sekarang",
    },
    portfolio: {
      title: "Portofolio Proyek",
      subtitle: "Jelajahi rekam jejak keberhasilan kami dalam berbagai proyek industri.",
      documentation: "Dokumentasi Lapangan",
      scope: "Ruang Lingkup Pekerjaan",
    },
    footer: {
      about: "PT. Manggala Utama Indonesia adalah penyedia solusi sistem bahan bakar dan teknologi informasi yang berfokus pada inovasi dan kualitas.",
      quick_links: "Tautan Cepat",
      contact_info: "Informasi Kontak",
    }
  },
  en: {
    common: {
      loading: "Loading...",
      error: "An error occurred",
      save: "Save",
      cancel: "Cancel",
      delete: "Delete",
      edit: "Edit",
      view_detail: "View Details",
      contact_us: "Contact Us",
      learn_more: "Learn More",
    },
    nav: {
      home: "Home",
      about: "About Us",
      products: "Products",
      portfolio: "Portfolio",
      solutions: "Solutions",
      resource: "Resource",
      faq: "FAQ",
      blog: "Blog",
      contact: "Contact",
    },
    hero: {
      title: "Fueling System & IT Solution Provider",
      subtitle: "Integrated Solutions for Your Industrial Needs. We provide cutting-edge technology in fuel systems and IT solutions.",
      cta: "Consult Now",
    },
    portfolio: {
      title: "Project Portfolio",
      subtitle: "Explore our track record of success in various industrial projects.",
      documentation: "Field Documentation",
      scope: "Scope of Work",
    },
    footer: {
      about: "PT. Manggala Utama Indonesia is a fuel system and information technology solution provider focusing on innovation and quality.",
      quick_links: "Quick Links",
      contact_info: "Contact Information",
    }
  }
};

export type Language = keyof typeof translations;
export type TranslationKey = keyof typeof translations.id;
