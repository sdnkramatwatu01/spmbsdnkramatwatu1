// Service to interact with Google Apps Script Backend

// To use the real backend, replace this URL with your deployed Google Apps Script Web App URL
const GAS_WEB_APP_URL = ""; 

export interface FormField {
  id: string;
  label: string;
  type: 'text' | 'number' | 'select' | 'date' | 'file' | 'textarea';
  options?: string[];
  required: boolean;
}

export interface PanduanDokumen {
  id: string;
  icon: 'FileDigit' | 'FileBadge' | 'FileImage' | 'FileText';
  title: string;
  description: string;
}

export interface AppSettings {
  namaSekolah: string;
  alamat: string;
  telepon: string;
  email: string;
  deskripsi: string;
  statusPendaftaran: 'Buka' | 'Tutup';
  formFields: FormField[];
  persyaratanDaftarUlang?: string;
  tanggalDaftarUlang?: string;
  tanggalPengumuman?: string;
  logoSekolah?: string;
  kopSurat?: string;
  namaKepalaSekolah?: string;
  tandaTanganKepalaSekolah?: string;
  stempelSekolah?: string;
  tahunPendaftaran?: string;
  nomorSurat?: string;
  tempatSurat?: string;
  tanggalSurat?: string;
  nipKepalaSekolah?: string;
  catatanTambahan?: string;
  gambarHeaderBeranda?: string;
  koordinatSekolah?: string;
  tanggalCutoffUsia?: string;
  sambutanKepalaSekolah?: string;
  fotoKepalaSekolah?: string;
  visiSekolah?: string;
  misiSekolah?: string;
  panduanJudul?: string;
  panduanDeskripsi?: string;
  panduanPeringatan?: string;
  panduanDokumen?: PanduanDokumen[];
  panduanAlur?: string[];
}

export interface RegistrationData {
  [key: string]: any;
}

export interface AdminData extends RegistrationData {
  Timestamp: string;
  'No Pendaftaran': string;
  Status: 'Proses' | 'Lulus' | 'Tidak Lulus';
  'Alasan Penolakan'?: string;
}

// Mock data for preview if GAS URL is not set
const getInitialMockSettings = (): AppSettings => {
  const defaultSettings: AppSettings = {
    namaSekolah: "SD Negeri Kramatwatu 1",
    alamat: "Jl. Pendidikan No. 123, Kota Pelajar, Indonesia 12345",
    telepon: "(021) 1234-5678",
    email: "sdnkramatwatu01@gmail.com",
    deskripsi: "Mencetak generasi penerus bangsa yang cerdas, berakhlak mulia, dan siap menghadapi tantangan masa depan dengan pendidikan berkualitas.",
    statusPendaftaran: "Buka",
    persyaratanDaftarUlang: "1. Membawa Bukti Kelulusan yang dicetak\n2. Membawa Fotokopi Akta Kelahiran (2 lembar)\n3. Membawa Fotokopi Kartu Keluarga (2 lembar)\n4. Membawa Pas Foto 3x4 (4 lembar)\n5. Melakukan pembayaran administrasi awal",
    tanggalDaftarUlang: "2024-07-15",
    tanggalPengumuman: "",
    logoSekolah: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2022&auto=format&fit=crop",
    tahunPendaftaran: new Date().getFullYear().toString(),
    koordinatSekolah: "-6.200000, 106.816666", // Default to Jakarta
    tanggalCutoffUsia: "", // Tanggal ditetapkan cutoff usia
    sambutanKepalaSekolah: "Selamat datang di website resmi SPMB SD Negeri Kramatwatu 1. Kami berkomitmen untuk memberikan pelayanan pendidikan terbaik bagi putra-putri Anda. Mari bergabung bersama kami untuk mencetak generasi penerus bangsa yang cerdas, berakhlak mulia, dan berprestasi.",
    fotoKepalaSekolah: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop",
    visiSekolah: "Menjadi sekolah dasar unggulan yang menghasilkan lulusan berakhlak mulia, cerdas, terampil, dan berwawasan lingkungan.",
    misiSekolah: "1. Menyelenggarakan pembelajaran yang aktif, inovatif, kreatif, efektif, dan menyenangkan (PAIKEM).\n2. Menanamkan nilai-nilai agama dan budi pekerti luhur dalam kehidupan sehari-hari.\n3. Mengembangkan potensi, bakat, dan minat siswa melalui kegiatan ekstrakurikuler.\n4. Menciptakan lingkungan sekolah yang bersih, sehat, dan asri.",
    formFields: [
      { id: "Pilih Jalur", label: "Pilih Jalur", type: "select", options: ["Domisili", "Afirmasi", "Mutasi"], required: true },
      { id: "Nama Lengkap", label: "Nama Lengkap", type: "text", required: true },
      { id: "Nama Panggilan", label: "Nama Panggilan", type: "text", required: true },
      { id: "NIK", label: "NIK", type: "text", required: true },
      { id: "Tempat Lahir", label: "Tempat Lahir", type: "text", required: true },
      { id: "Tanggal Lahir", label: "Tanggal Lahir", type: "date", required: true },
      { id: "Jenis Kelamin", label: "Jenis Kelamin", type: "select", options: ["Laki-laki", "Perempuan"], required: true },
      { id: "Agama", label: "Agama", type: "select", options: ["Islam", "Kristen", "Hindu", "Budha", "Konghucu"], required: true },
      { id: "Anak Ke-", label: "Anak Ke-", type: "text", required: true },
      { id: "Jumlah Saudara Kandung", label: "Jumlah Saudara Kandung", type: "text", required: true },
      { id: "Bahasa Sehari-hari", label: "Bahasa Sehari-hari", type: "text", required: true },
      { id: "Tinggi Badan", label: "Tinggi Badan (cm)", type: "text", required: true },
      { id: "Berat Badan", label: "Berat Badan (kg)", type: "text", required: true },
      { id: "Alamat", label: "Alamat Lengkap", type: "textarea", required: true },
      { id: "Nama Ayah", label: "Nama Ayah", type: "text", required: true },
      { id: "NIK Ayah", label: "NIK Ayah", type: "text", required: true },
      { id: "Tgl Lahir Ayah", label: "Tgl Lahir Ayah", type: "date", required: true },
      { id: "Pendidikan Ayah", label: "Pendidikan Ayah", type: "select", options: ["Tidak Sekolah", "TK/PAUD", "SD", "SMP", "SMA/SMK", "D2/D3", "S1", "S2", "S3"], required: true },
      { id: "Pekerjaan Ayah", label: "Pekerjaan Ayah", type: "select", options: ["Tidak Bekerja", "Nelayan", "Petani", "Peternak", "PNS/TNI/Polri", "Karyawan Swasta", "Pedagang Kecil", "Pedagang Besar", "Wiraswasta", "Wirausaha", "Buruh", "Pensiunan", "TKI", "Karyawan BUMN", "Sudah Meninggal"], required: true },
      { id: "Nama Ibu", label: "Nama Ibu", type: "text", required: true },
      { id: "NIK Ibu", label: "NIK Ibu", type: "text", required: true },
      { id: "Tgl Lahir Ibu", label: "Tgl Lahir Ibu", type: "date", required: true },
      { id: "Pendidikan Ibu", label: "Pendidikan Ibu", type: "select", options: ["Tidak Sekolah", "TK/PAUD", "SD", "SMP", "SMA/SMK", "D2/D3", "S1", "S2", "S3"], required: true },
      { id: "Pekerjaan Ibu", label: "Pekerjaan Ibu", type: "select", options: ["Tidak Bekerja", "Nelayan", "Petani", "Peternak", "PNS/TNI/Polri", "Karyawan Swasta", "Pedagang Kecil", "Pedagang Besar", "Wiraswasta", "Wirausaha", "Buruh", "Pensiunan", "TKI", "Karyawan BUMN", "Sudah Meninggal"], required: true },
      { id: "No HP", label: "No. WhatsApp Aktif", type: "text", required: true },
      { id: "Ijazah", label: "Ijazah/SKHUN (jika ada)", type: "file", required: true },
      { id: "Kartu Keluarga", label: "Kartu Keluarga", type: "file", required: true },
      { id: "Akta Kelahiran", label: "Akta Kelahiran", type: "file", required: true }
      { id: "Afirmasi", label: "Kartu PKH/KIP (jalur afirmasi)", type: "file", required: true },
      { id: "Mutasi", label: "Suket Pindah (jalur mutasi)", type: "file", required: true },
    ],
    panduanJudul: "Panduan Pendaftaran SPMB",
    panduanDeskripsi: "Persiapkan dokumen berikut sebelum mulai mengisi formulir pendaftaran.",
    panduanPeringatan: "Pastikan semua dokumen di-scan atau difoto dengan jelas dan dapat terbaca. Format file yang disarankan adalah JPG, PNG, atau PDF dengan ukuran maksimal 2MB per file.",
    panduanDokumen: [
      { id: "1", icon: "FileDigit", title: "Kartu Keluarga (KK)", description: "Asli atau fotokopi yang dilegalisir. Pastikan NIK dan nama calon siswa tercantum dengan benar." },
      { id: "2", icon: "FileBadge", title: "Akta Kelahiran", description: "Dokumen asli atau fotokopi legalisir untuk verifikasi usia dan data diri calon siswa." },
      { id: "3", icon: "FileImage", title: "Pas Foto Terbaru", description: "Pas foto berwarna ukuran 3x4 dengan latar belakang merah atau biru." },
      { id: "4", icon: "FileText", title: "Ijazah / SKHUN (Jika Ada)", description: "Surat Keterangan Lulus atau Ijazah dari jenjang pendidikan sebelumnya (TK/PAUD)." }
    ],
    panduanAlur: [
      "Siapkan seluruh dokumen persyaratan dalam bentuk file digital (foto/scan).",
      "Klik tombol 'Mulai Pendaftaran' di bawah atau menu 'Daftar' di navigasi.",
      "Isi seluruh kolom formulir dengan data yang valid dan sesuai dengan dokumen asli.",
      "Tandai lokasi rumah Anda di peta yang disediakan untuk perhitungan jarak.",
      "Unggah dokumen persyaratan pada kolom yang tersedia.",
      "Kirim formulir dan simpan Nomor Pendaftaran Anda untuk mengecek status kelulusan."
    ]
  };

  const stored = localStorage.getItem('mockSettings');
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      return { ...defaultSettings, ...parsed }; // Merge default settings with parsed local settings
    } catch (e) {
      console.error("Failed to parse mock settings from localStorage", e);
    }
  }
  return defaultSettings;
};

let mockSettings: AppSettings = getInitialMockSettings();

const saveMockSettings = (settings: AppSettings) => {
  mockSettings = settings;
  try {
    localStorage.setItem('mockSettings', JSON.stringify(settings));
  } catch (e) {
    console.error("Failed to save mock settings to localStorage", e);
  }
};

const getInitialMockData = (): AdminData[] => {
  const stored = localStorage.getItem('mockData');
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.error("Failed to parse mock data from localStorage", e);
    }
  }
  return [
    {
      Timestamp: new Date().toISOString(),
      'No Pendaftaran': "SPMB-2024-001",
      'Nama Lengkap': "Budi Santoso",
      'NIK': "1234567890123456",
      'Tempat Lahir': "Jakarta",
      'Tanggal Lahir': "2015-05-10",
      'Jenis Kelamin': "Laki-laki",
      'Alamat': "Jl. Sudirman No. 1",
      'Nama Orang Tua': "Agus Santoso",
      'No HP': "081234567890",
      Status: "Proses"
    }
  ];
};

let mockData: AdminData[] = getInitialMockData();

const saveMockData = (data: AdminData[]) => {
  mockData = data;
  try {
    localStorage.setItem('mockData', JSON.stringify(data));
  } catch (e) {
    console.error("Failed to save mock data to localStorage", e);
  }
};

export const getSettings = async (): Promise<AppSettings> => {
  if (!GAS_WEB_APP_URL) {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { ...mockSettings };
  }
  try {
    const response = await fetch(`${GAS_WEB_APP_URL}?action=getSettings&t=${Date.now()}`);
    const result = await response.json();
    if (result.status === "success") {
      return {
        ...result.data,
        formFields: typeof result.data.formFields === 'string' ? JSON.parse(result.data.formFields) : result.data.formFields
      };
    }
    throw new Error(result.message);
  } catch (error) {
    console.error("Error fetching settings:", error);
    throw error;
  }
};

export const updateSettings = async (settings: Partial<AppSettings>) => {
  if (!GAS_WEB_APP_URL) {
    await new Promise(resolve => setTimeout(resolve, 800));
    saveMockSettings({ ...mockSettings, ...settings });
    return { status: "success" };
  }
  try {
    const response = await fetch(GAS_WEB_APP_URL, {
      method: "POST",
      body: JSON.stringify({
        action: "updateSettings",
        settings
      }),
      headers: { "Content-Type": "text/plain;charset=utf-8" },
    });
    return await response.json();
  } catch (error) {
    console.error("Error updating settings:", error);
    throw error;
  }
};

export const submitRegistration = async (data: RegistrationData) => {
  if (!GAS_WEB_APP_URL) {
    await new Promise(resolve => setTimeout(resolve, 1500));
    if (mockSettings.statusPendaftaran === 'Tutup') {
      return { status: "error", message: "Pendaftaran sedang ditutup." };
    }
    const year = mockSettings.tahunPendaftaran || new Date().getFullYear().toString();
    const newEntry: AdminData = {
      ...data,
      Timestamp: new Date().toISOString(),
      'No Pendaftaran': `SPMB-${year}-${String(mockData.length + 1).padStart(3, '0')}`,
      Status: 'Proses'
    };
    saveMockData([...mockData, newEntry]);
    return { status: "success", noPendaftaran: newEntry['No Pendaftaran'] };
  }
  try {
    const response = await fetch(GAS_WEB_APP_URL, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "text/plain;charset=utf-8" },
    });
    return await response.json();
  } catch (error) {
    console.error("Error submitting registration:", error);
    throw error;
  }
};

export const getRegistrations = async (): Promise<AdminData[]> => {
  if (!GAS_WEB_APP_URL) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return [...mockData];
  }

  try {
    const response = await fetch(`${GAS_WEB_APP_URL}?t=${Date.now()}`);
    const result = await response.json();
    if (result.status === "success") {
      return result.data;
    }
    throw new Error(result.message);
  } catch (error) {
    console.error("Error fetching registrations:", error);
    throw error;
  }
};

export const updateStatus = async (noPendaftaran: string, newStatus: string, alasan?: string) => {
  if (!GAS_WEB_APP_URL) {
    await new Promise(resolve => setTimeout(resolve, 800));
    const index = mockData.findIndex(d => d['No Pendaftaran'] === noPendaftaran);
    if (index !== -1) {
      const newData = [...mockData];
      newData[index] = { ...newData[index], Status: newStatus as any };
      if (alasan !== undefined) {
        newData[index]['Alasan Penolakan'] = alasan;
      }
      saveMockData(newData);
      return { status: "success" };
    }
    throw new Error("Data not found");
  }

  try {
    const response = await fetch(GAS_WEB_APP_URL, {
      method: "POST",
      body: JSON.stringify({
        action: "updateStatus",
        noPendaftaran,
        newStatus,
        alasan
      }),
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
    });
    return await response.json();
  } catch (error) {
    console.error("Error updating status:", error);
    throw error;
  }
};

export const checkStatus = async (noPendaftaran: string) => {
  if (!GAS_WEB_APP_URL) {
    await new Promise(resolve => setTimeout(resolve, 800));
    const student = mockData.find(d => d['No Pendaftaran'] === noPendaftaran);
    if (student) {
      const namaKey = Object.keys(student).find(k => k.toLowerCase().includes('nama')) || 'Nama Lengkap';
      return { 
        status: "success", 
        data: {
          noPendaftaran: student['No Pendaftaran'],
          namaLengkap: student[namaKey] || 'Siswa',
          status: student.Status,
          alasanPenolakan: student['Alasan Penolakan']
        }
      };
    }
    return { status: "error", message: "Data tidak ditemukan" };
  }

  try {
    const response = await fetch(GAS_WEB_APP_URL, {
      method: "POST",
      body: JSON.stringify({
        action: "checkStatus",
        noPendaftaran
      }),
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
    });
    return await response.json();
  } catch (error) {
    console.error("Error checking status:", error);
    throw error;
  }
};

export const loginAdmin = async (username: string, password: string) => {
  if (!GAS_WEB_APP_URL) {
    await new Promise(resolve => setTimeout(resolve, 800));
    if (username === 'admin' && password === 'admin123') {
      return { status: "success" };
    }
    return { status: "error", message: "Username atau password salah" };
  }

  try {
    const response = await fetch(GAS_WEB_APP_URL, {
      method: "POST",
      body: JSON.stringify({
        action: "login",
        username,
        password
      }),
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
    });
    return await response.json();
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};
