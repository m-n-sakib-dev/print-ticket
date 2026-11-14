// Dropdown-er option gulo. Notun option dite array-te line jog koro.
export const routes = ['পুলিশ / ডাউন', 'পুলিশ / আপ']

export const fares = [ '১১০']

// "from" ar "to" dropdown duto-i ei list theke ashe
export const stops = ['গোলাপবাগ', 'কুরিল', 'যমুনা']

// "কোথা থেকে" stop select korle ei value gulo auto boshe, pore form-e bodlano jay.
// Ekhane na thakle ager value-i thake. counterman = countermen-er naam.
export const stopDefaults = {
  'গোলাপবাগ': { stopNo: 22, route: 'পুলিশ / ডাউন', fare: '১১০', counterman: 'বাদশাহ', to: 'কুরিল', ticketNo: 35 },
  'যমুনা': { stopNo: 8, route: 'পুলিশ / আপ', counterman: 'শাহ আলম', to: 'গোলাপবাগ', ticketNo: 323 },
}

// Counterman-er naam ar mobile ek sathe
export const countermen = [
  { name: 'শাহ আলম', mobile: '+881920716253' },
  { name: 'বাদশাহ', mobile: '+8801930465057' },
]

// "কোথায়" stop-er aage boshar letter (A-Z)
export const letters = [
  'U',
  'D',]

// Font dropdown-er list. Prothom ta default.
export const fonts = [
  'Kohinoor Bangla',
  'Bangla MN',
  'Bangla Sangam MN',
  'Hind Siliguri',
  'Noto Sans Bengali',
  'Noto Serif Bengali',
  'Anek Bangla',
  'Baloo Da 2',
  'Atma',
  'Mina',
  'Tiro Bangla',
  'Galada',
  'Alkatra',
  'Google Sans',
  'Siyam Rupali',
  'SolaimanLipi',
  'SolaimanLipi Thin',
  'Kalpurush',
  'Nikosh',
  'Mukti',
  'Lohit Bengali',
  'Ekushey Lohit',
  'Apona Lohit',
  'Adorsho Lipi',
  'Charu Chandan',
  'Charu Chandan Hard Stroke',
  'Vrinda',
  'Bensen',
  'Bangla (Old)',
  'Bensen Handwriting',
  'Charukola Ultra Light',
  'Tiro Bangla Italic',
  'Mukti Italic',
]
