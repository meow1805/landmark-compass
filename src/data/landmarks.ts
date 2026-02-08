import { Landmark } from '@/types/exhibit';

export const landmarks: Landmark[] = [
  // ── LUZON ──────────────────────────────────────────────
  {
    id: 'rizal-park',
    name: 'Rizal Park',
    location: 'Manila',
    region: 'luzon',
    description: 'Historic urban park and national monument.',
    imageUrl: '/landmarks/rizal-park.webp',
    mapCenter: [14.5822, 120.9769],
    mapZoom: 16,
    hiddenConditions: [
      {
        id: 'rp-distance',
        type: 'distance',
        label: 'Long Walking Distance',
        description: 'The park spans 58 hectares with main attractions spread across the grounds.',
        healthImpact: -5,
        staminaImpact: -25,
        moneyImpact: 0,
        personaMultipliers: {
          'elderly': { stamina: 1.5, health: 1.3 },
          'parent': { stamina: 1.3 },
          'limited-stamina': { stamina: 1.8, health: 1.2 }
        }
      },
      {
        id: 'rp-shade',
        type: 'shade',
        label: 'Open Monument Grounds',
        description: 'The Rizal Monument area and Chinese & Japanese Gardens have wide open lawns with little tree cover.',
        healthImpact: -10,
        staminaImpact: -15,
        moneyImpact: -50,
        personaMultipliers: {
          'elderly': { health: 1.5, stamina: 1.3 },
          'parent': { health: 1.2 }
        }
      },
      {
        id: 'rp-crowd',
        type: 'crowd',
        label: 'Weekend & Holiday Crowds',
        description: 'Rizal Park draws massive crowds on Sundays and national holidays, making rest spots scarce.',
        healthImpact: -5,
        staminaImpact: -10,
        moneyImpact: -30,
        personaMultipliers: {
          'elderly': { stamina: 1.4, health: 1.2 },
          'parent': { stamina: 1.6 }
        }
      },
      {
        id: 'rp-vendors',
        type: 'vendors',
        label: 'Aggressive Street Vendors',
        description: 'Hawkers selling souvenirs, snacks, and tour services persistently approach visitors near the monument.',
        healthImpact: 0,
        staminaImpact: -5,
        moneyImpact: -80,
        personaMultipliers: {
          'parent': { money: 1.5 },
          'elderly': { money: 1.3 }
        }
      },
      {
        id: 'rp-seating',
        type: 'seating',
        label: 'Sparse Seating Between Zones',
        description: 'Benches cluster near food areas but the stretches between the National Museum and Quirino Grandstand lack rest spots.',
        healthImpact: -5,
        staminaImpact: -20,
        moneyImpact: 0,
        personaMultipliers: {
          'elderly': { stamina: 1.5, health: 1.2 },
          'limited-stamina': { stamina: 1.6 }
        }
      },
      {
        id: 'rp-safety',
        type: 'safety',
        label: 'Pickpocket Risk Zones',
        description: 'The crowded areas around the Quirino Grandstand and Light & Sound show are known for petty theft.',
        healthImpact: 0,
        staminaImpact: 0,
        moneyImpact: -150,
        personaMultipliers: {
          'elderly': { money: 1.5 },
          'parent': { money: 1.4 }
        }
      }
    ]
  },
  {
    id: 'intramuros',
    name: 'Intramuros',
    location: 'Manila',
    region: 'luzon',
    description: 'Historic walled city with Spanish colonial architecture.',
    imageUrl: '/landmarks/intramuros.jpg',
    mapCenter: [14.62, 120.94],
    mapZoom: 16,
    hiddenConditions: [
      {
        id: 'int-stairs',
        type: 'stairs',
        label: 'Fort Santiago Ramparts',
        description: 'Climbing the stone ramparts of Fort Santiago involves steep, narrow stairways with no handrails.',
        healthImpact: -15,
        staminaImpact: -20,
        moneyImpact: 0,
        personaMultipliers: {
          'elderly': { health: 1.8, stamina: 1.5 },
          'parent': { stamina: 1.4, money: 1.5 },
          'limited-stamina': { stamina: 1.7, health: 1.3 }
        }
      },
      {
        id: 'int-cobblestone',
        type: 'accessibility',
        label: 'Cobblestone Streets',
        description: 'Original 16th-century cobblestone streets are uneven and difficult for wheelchairs, strollers, and mobility aids.',
        healthImpact: -5,
        staminaImpact: -15,
        moneyImpact: -100,
        personaMultipliers: {
          'parent': { stamina: 1.5, money: 1.3 },
          'elderly': { health: 1.3, stamina: 1.4 }
        }
      },
      {
        id: 'int-distance',
        type: 'distance',
        label: 'Spread-out Historic Sites',
        description: 'Manila Cathedral, San Agustin Church, Casa Manila, and Fort Santiago are at opposite ends of the 64-hectare walled city.',
        healthImpact: -5,
        staminaImpact: -20,
        moneyImpact: -80,
        personaMultipliers: {
          'elderly': { stamina: 1.4 },
          'limited-stamina': { stamina: 1.6 }
        }
      },
      {
        id: 'int-cost',
        type: 'cost',
        label: 'Multiple Paid Attractions',
        description: 'Fort Santiago (₱75), Casa Manila (₱75), San Agustin Museum (₱200). entry fees add up fast for the full Intramuros experience.',
        healthImpact: 0,
        staminaImpact: 0,
        moneyImpact: -200,
        personaMultipliers: {
          'parent': { money: 1.6 },
          'elderly': { money: 1.2 }
        }
      },
      {
        id: 'int-calesa',
        type: 'transport',
        label: 'Calesa Price Haggling',
        description: 'Horse-drawn calesa rides are the main transport but drivers often overcharge tourists unfamiliar with rates.',
        healthImpact: 0,
        staminaImpact: -5,
        moneyImpact: -120,
        personaMultipliers: {
          'parent': { money: 1.4 },
          'elderly': { money: 1.3 }
        }
      }
    ]
  },
  {
    id: 'vigan-heritage',
    name: 'Vigan Heritage Village',
    location: 'Ilocos Sur',
    region: 'luzon',
    description: 'UNESCO World Heritage colonial Spanish town.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Calle_Crisologo%2C_Philippines.jpg/800px-Calle_Crisologo%2C_Philippines.jpg',
    mapCenter: [17.5745, 120.3869],
    mapZoom: 16,
    hiddenConditions: [
      {
        id: 'vh-cobblestone',
        type: 'accessibility',
        label: 'Calle Crisologo Cobblestones',
        description: 'The famous Calle Crisologo has preserved 16th-century cobblestones that are extremely difficult for wheelchairs and strollers.',
        healthImpact: -5,
        staminaImpact: -20,
        moneyImpact: -80,
        personaMultipliers: {
          'parent': { stamina: 1.5, money: 1.4 },
          'elderly': { health: 1.2, stamina: 1.4 }
        }
      },
      {
        id: 'vh-shade',
        type: 'shade',
        label: 'Exposed Heritage Walk',
        description: 'Historic preservation rules prevent adding modern shade structures. the midday Ilocos sun is relentless on the open street.',
        healthImpact: -10,
        staminaImpact: -15,
        moneyImpact: -60,
        personaMultipliers: {
          'elderly': { health: 1.4 },
          'parent': { health: 1.2, money: 1.2 }
        }
      },
      {
        id: 'vh-calesa',
        type: 'transport',
        label: 'Horse-Drawn Calesa Traffic',
        description: 'Calesas share the narrow streets with pedestrians. the cobblestones amplify noise and horse waste is common.',
        healthImpact: -5,
        staminaImpact: -5,
        moneyImpact: -70,
        personaMultipliers: {
          'parent': { health: 1.3 },
          'elderly': { health: 1.2, stamina: 1.2 }
        }
      },
      {
        id: 'vh-vendors',
        type: 'vendors',
        label: 'Dense Souvenir Shops',
        description: 'Nearly every ancestral house ground floor is a souvenir shop. persistent sellers can be overwhelming and drain your budget.',
        healthImpact: 0,
        staminaImpact: -5,
        moneyImpact: -100,
        personaMultipliers: {
          'parent': { money: 1.6 },
          'elderly': { money: 1.3 }
        }
      },
      {
        id: 'vh-weather',
        type: 'weather',
        label: 'Ilocos Dry Season Heat',
        description: 'March to May temperatures regularly hit 38°C in Vigan, with the stone streets radiating extra heat.',
        healthImpact: -15,
        staminaImpact: -20,
        moneyImpact: -40,
        personaMultipliers: {
          'elderly': { health: 1.6, stamina: 1.4 },
          'limited-stamina': { stamina: 1.5, health: 1.3 }
        }
      },
      {
        id: 'vh-restroom',
        type: 'restroom',
        label: 'Scarce Public Restrooms',
        description: 'Very few public restrooms along the heritage strip. visitors must find a restaurant or museum that allows access.',
        healthImpact: -5,
        staminaImpact: -10,
        moneyImpact: -30,
        personaMultipliers: {
          'parent': { stamina: 1.4 },
          'elderly': { stamina: 1.3, health: 1.2 }
        }
      }
    ]
  },

  // ── VISAYAS ────────────────────────────────────────────
  {
    id: 'chocolate-hills',
    name: 'Chocolate Hills',
    location: 'Bohol',
    region: 'visayas',
    description: 'Iconic geological formation of grass-covered limestone hills.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Chocolate_Hills_overview.JPG/960px-Chocolate_Hills_overview.JPG',
    mapCenter: [9.8292, 124.165],
    mapZoom: 14,
    hiddenConditions: [
      {
        id: 'ch-stairs',
        type: 'stairs',
        label: '214-Step Viewing Deck Climb',
        description: 'The main viewing deck in Carmen requires climbing exactly 214 concrete steps with no alternative route.',
        healthImpact: -20,
        staminaImpact: -30,
        moneyImpact: 0,
        personaMultipliers: {
          'elderly': { health: 2.0, stamina: 1.8 },
          'parent': { stamina: 1.5 },
          'limited-stamina': { stamina: 2.0, health: 1.5 }
        }
      },
      {
        id: 'ch-shade',
        type: 'shade',
        label: 'Fully Exposed Stairway',
        description: 'The entire 214-step climb is under direct tropical sun with zero shelter or trees along the path.',
        healthImpact: -15,
        staminaImpact: -20,
        moneyImpact: -40,
        personaMultipliers: {
          'elderly': { health: 1.5, stamina: 1.3 },
          'limited-stamina': { stamina: 1.4, health: 1.2 }
        }
      },
      {
        id: 'ch-transport',
        type: 'transport',
        label: 'Remote Carmen Location',
        description: 'The viewing deck is in Carmen, 55 km from Tagbilaran City. requires renting a motorbike or van for the day.',
        healthImpact: 0,
        staminaImpact: -10,
        moneyImpact: -200,
        personaMultipliers: {
          'parent': { money: 1.5, stamina: 1.2 },
          'elderly': { money: 1.4 }
        }
      },
      {
        id: 'ch-terrain',
        type: 'terrain',
        label: 'Loose Gravel ATV Trails',
        description: 'The popular ATV tour through the hills traverses loose gravel and steep dirt paths. risk of falls and dust inhalation.',
        healthImpact: -15,
        staminaImpact: -15,
        moneyImpact: -150,
        personaMultipliers: {
          'elderly': { health: 1.6, stamina: 1.4 },
          'parent': { health: 1.3, money: 1.3 },
          'limited-stamina': { health: 1.4, stamina: 1.5 }
        }
      },
      {
        id: 'ch-signage',
        type: 'signage',
        label: 'Poor Trail Markings',
        description: 'Beyond the main viewing deck, trails to secondary viewpoints are poorly marked. easy to get lost without a guide.',
        healthImpact: -5,
        staminaImpact: -15,
        moneyImpact: -60,
        personaMultipliers: {
          'elderly': { stamina: 1.3 },
          'parent': { stamina: 1.4 }
        }
      }
    ]
  },
  {
    id: 'magellans-cross',
    name: "Magellan's Cross",
    location: 'Cebu City',
    region: 'visayas',
    description: 'Historic Christian cross planted by Ferdinand Magellan in 1521.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Magellan%27s_Cross_Cebu_%28cropped%29.jpg/800px-Magellan%27s_Cross_Cebu_%28cropped%29.jpg',
    mapCenter: [10.2935, 123.9021],
    mapZoom: 17,
    hiddenConditions: [
      {
        id: 'mc-crowd',
        type: 'crowd',
        label: 'Sinulog Festival Crush',
        description: 'Located next to the Basilica del Santo Niño. during Sinulog season (January) the area is virtually impassable.',
        healthImpact: -10,
        staminaImpact: -20,
        moneyImpact: -60,
        personaMultipliers: {
          'elderly': { stamina: 1.5, health: 1.4 },
          'parent': { stamina: 1.6, health: 1.2 }
        }
      },
      {
        id: 'mc-vendors',
        type: 'vendors',
        label: 'Candle & Prayer Sellers',
        description: 'Persistent vendors selling candles, prayer oils, and Sto. Niño figurines line every approach to the cross.',
        healthImpact: 0,
        staminaImpact: -5,
        moneyImpact: -80,
        personaMultipliers: {
          'parent': { money: 1.5 },
          'elderly': { money: 1.4 }
        }
      },
      {
        id: 'mc-shade',
        type: 'shade',
        label: 'Open Plaza Heat',
        description: 'The kiosk housing the cross is small. the surrounding Plaza Sugbo and Cebu downtown streets have brutal midday sun.',
        healthImpact: -10,
        staminaImpact: -15,
        moneyImpact: -40,
        personaMultipliers: {
          'elderly': { health: 1.5 },
          'limited-stamina': { stamina: 1.4 }
        }
      },
      {
        id: 'mc-accessibility',
        type: 'accessibility',
        label: 'Uneven Heritage Pavement',
        description: 'The old stone pavement around the Basilica and kiosk is uneven, cracked, and slippery when wet from afternoon rains.',
        healthImpact: -5,
        staminaImpact: -10,
        moneyImpact: 0,
        personaMultipliers: {
          'elderly': { health: 1.3, stamina: 1.3 },
          'parent': { stamina: 1.2 }
        }
      },
      {
        id: 'mc-safety',
        type: 'safety',
        label: 'Downtown Cebu Pickpockets',
        description: 'The Colon Street area surrounding the cross is notorious for pickpockets targeting distracted tourists.',
        healthImpact: 0,
        staminaImpact: 0,
        moneyImpact: -180,
        personaMultipliers: {
          'elderly': { money: 1.6 },
          'parent': { money: 1.4 }
        }
      },
      {
        id: 'mc-restroom',
        type: 'restroom',
        label: 'No Nearby Restrooms',
        description: 'The cross kiosk and Basilica have no public restrooms. nearest facilities are in Ayala or SM malls, a jeepney ride away.',
        healthImpact: -5,
        staminaImpact: -10,
        moneyImpact: -30,
        personaMultipliers: {
          'parent': { stamina: 1.5 },
          'elderly': { stamina: 1.3, health: 1.2 }
        }
      }
    ]
  },
  {
    id: 'the-ruins',
    name: 'The Ruins',
    location: 'Talisay, Negros Occidental',
    region: 'visayas',
    description: 'Remains of a grand mansion, the "Taj Mahal of Negros."',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/The_Ruins_%28Talisay%2C_Negros_Occidental%29_2023-08-06.jpg/800px-The_Ruins_%28Talisay%2C_Negros_Occidental%29_2023-08-06.jpg',
    mapCenter: [10.6341, 122.9674],
    mapZoom: 17,
    hiddenConditions: [
      {
        id: 'tr-stairs',
        type: 'stairs',
        label: 'Narrow Mansion Staircase',
        description: 'The remaining staircase of the Lacson mansion is narrow and weathered. exploring upper levels is physically demanding.',
        healthImpact: -10,
        staminaImpact: -20,
        moneyImpact: 0,
        personaMultipliers: {
          'elderly': { health: 1.6, stamina: 1.5 },
          'parent': { stamina: 1.3 },
          'limited-stamina': { stamina: 1.7, health: 1.2 }
        }
      },
      {
        id: 'tr-shade',
        type: 'shade',
        label: 'Roofless Ruins',
        description: 'The mansion was burned in WWII and has no roof. visitors are exposed to direct Negros sun throughout the entire tour.',
        healthImpact: -15,
        staminaImpact: -15,
        moneyImpact: -50,
        personaMultipliers: {
          'elderly': { health: 1.5, stamina: 1.3 },
          'limited-stamina': { health: 1.3, stamina: 1.4 }
        }
      },
      {
        id: 'tr-transport',
        type: 'transport',
        label: 'Talisay City Location',
        description: 'Located in Talisay, 15 minutes from Bacolod. requires a tricycle or Grab ride; no public transit stops nearby.',
        healthImpact: 0,
        staminaImpact: -10,
        moneyImpact: -120,
        personaMultipliers: {
          'parent': { money: 1.3, stamina: 1.2 },
          'elderly': { money: 1.2 }
        }
      },
      {
        id: 'tr-cost',
        type: 'cost',
        label: 'Pricey Café & Entry Combo',
        description: 'Entry fee plus the on-site café (only food option) charges premium prices. a simple meal can cost ₱300+ per person.',
        healthImpact: 0,
        staminaImpact: 0,
        moneyImpact: -180,
        personaMultipliers: {
          'parent': { money: 1.5 },
          'elderly': { money: 1.3 }
        }
      },
      {
        id: 'tr-weather',
        type: 'weather',
        label: 'Negros Afternoon Downpours',
        description: 'Sudden heavy rain is common in the afternoon. the roofless structure offers zero shelter, turning the ground slippery.',
        healthImpact: -10,
        staminaImpact: -10,
        moneyImpact: -30,
        personaMultipliers: {
          'elderly': { health: 1.4, stamina: 1.3 },
          'parent': { health: 1.2 },
          'limited-stamina': { health: 1.3 }
        }
      }
    ]
  },

  // ── MINDANAO ───────────────────────────────────────────
  {
    id: 'philippine-eagle-center',
    name: 'Philippine Eagle Center',
    location: 'Davao City',
    region: 'mindanao',
    description: 'Conservation center for the critically endangered Philippine Eagle.',
    imageUrl: '/landmarks/philippine-eagle-center.jpg',
    imageFocus: 'center 30%',
    mapCenter: [7.2408, 125.3936],
    mapZoom: 15,
    hiddenConditions: [
      {
        id: 'pec-terrain',
        type: 'terrain',
        label: 'Hilly Forest Trails',
        description: 'The center is nestled in the Malagos foothills. trails are steep, root-covered, and muddy after rain.',
        healthImpact: -10,
        staminaImpact: -25,
        moneyImpact: 0,
        personaMultipliers: {
          'elderly': { stamina: 1.5, health: 1.4 },
          'limited-stamina': { stamina: 1.8 }
        }
      },
      {
        id: 'pec-transport',
        type: 'transport',
        label: 'Remote Malagos Location',
        description: 'Located 36 km from Davao City center in the Malagos district. requires a 1-hour drive on winding mountain roads.',
        healthImpact: 0,
        staminaImpact: -10,
        moneyImpact: -150,
        personaMultipliers: {
          'parent': { money: 1.4 },
          'elderly': { money: 1.3, stamina: 1.2 }
        }
      },
      {
        id: 'pec-wildlife',
        type: 'wildlife',
        label: 'Mosquitoes & Insects',
        description: 'The forested mountain environment means aggressive mosquitoes and biting insects, especially near the raptor enclosures.',
        healthImpact: -10,
        staminaImpact: -5,
        moneyImpact: -30,
        personaMultipliers: {
          'parent': { health: 1.4 },
          'elderly': { health: 1.3 }
        }
      },
      {
        id: 'pec-accessibility',
        type: 'accessibility',
        label: 'Unpaved Gravel Paths',
        description: 'Many trails are loose gravel or packed dirt. wheelchair and stroller access is essentially impossible beyond the entrance.',
        healthImpact: -5,
        staminaImpact: -15,
        moneyImpact: 0,
        personaMultipliers: {
          'parent': { stamina: 1.4 },
          'elderly': { health: 1.2, stamina: 1.4 }
        }
      },
      {
        id: 'pec-weather',
        type: 'weather',
        label: 'Mountain Rain Showers',
        description: 'At 600m elevation, sudden rain showers are daily occurrences. the canopy provides some cover but trails become slippery.',
        healthImpact: -10,
        staminaImpact: -10,
        moneyImpact: -20,
        personaMultipliers: {
          'elderly': { health: 1.3, stamina: 1.3 },
          'limited-stamina': { stamina: 1.4 }
        }
      },
      {
        id: 'pec-signage',
        type: 'signage',
        label: 'Confusing Trail Junctions',
        description: 'The nature trail splits multiple times with minimal signage. easy to accidentally loop back or miss the crocodile and monkey areas.',
        healthImpact: 0,
        staminaImpact: -15,
        moneyImpact: 0,
        personaMultipliers: {
          'elderly': { stamina: 1.3 },
          'parent': { stamina: 1.4 }
        }
      }
    ]
  },
  {
    id: 'tinuy-an-falls',
    name: 'Tinuy-an Falls',
    location: 'Bislig, Surigao del Sur',
    region: 'mindanao',
    description: 'A majestic curtain waterfall known as the "Niagara of the Philippines."',
    imageUrl: '/landmarks/tinuy-an-falls.jpg',
    mapCenter: [8.1652, 126.3517],
    mapZoom: 15,
    hiddenConditions: [
      {
        id: 'tf-stairs',
        type: 'stairs',
        label: '100+ Slippery Stone Steps',
        description: 'Reaching the falls base requires descending over 100 moss-covered stone steps. going back up is exhausting.',
        healthImpact: -15,
        staminaImpact: -25,
        moneyImpact: 0,
        personaMultipliers: {
          'elderly': { health: 1.7, stamina: 1.6 },
          'parent': { stamina: 1.5 },
          'limited-stamina': { stamina: 1.8, health: 1.3 }
        }
      },
      {
        id: 'tf-water',
        type: 'water',
        label: 'Strong Current & Spray',
        description: 'The falls create a powerful mist and current. the bamboo raft ride gets you soaked and the current near the base is dangerously strong.',
        healthImpact: -10,
        staminaImpact: -10,
        moneyImpact: -50,
        personaMultipliers: {
          'elderly': { health: 1.5 },
          'parent': { health: 1.4, stamina: 1.3 }
        }
      },
      {
        id: 'tf-transport',
        type: 'transport',
        label: 'Deep Jungle Access Road',
        description: 'Located deep in Bislig rainforest. the habal-habal (motorcycle) ride from town is 30 minutes on a rough unpaved road.',
        healthImpact: -5,
        staminaImpact: -15,
        moneyImpact: -180,
        personaMultipliers: {
          'parent': { money: 1.5, stamina: 1.3 },
          'elderly': { money: 1.4, stamina: 1.3 }
        }
      },
      {
        id: 'tf-terrain',
        type: 'terrain',
        label: 'Wet & Slippery Rocks',
        description: 'Natural rock surfaces around the falls are constantly wet and covered in algae. falls and injuries are common.',
        healthImpact: -15,
        staminaImpact: -10,
        moneyImpact: 0,
        personaMultipliers: {
          'elderly': { health: 1.6, stamina: 1.3 },
          'parent': { health: 1.3 }
        }
      },
      {
        id: 'tf-wildlife',
        type: 'wildlife',
        label: 'Leeches & Jungle Insects',
        description: 'The surrounding rainforest has leeches on wet trails and aggressive insects. proper footwear and repellent are essential.',
        healthImpact: -10,
        staminaImpact: -5,
        moneyImpact: -40,
        personaMultipliers: {
          'elderly': { health: 1.4 },
          'parent': { health: 1.5 },
          'limited-stamina': { health: 1.3 }
        }
      },
      {
        id: 'tf-restroom',
        type: 'restroom',
        label: 'Minimal Facilities',
        description: 'Only a single basic restroom structure exists near the entrance. nothing at the falls base itself.',
        healthImpact: -5,
        staminaImpact: -5,
        moneyImpact: -20,
        personaMultipliers: {
          'parent': { stamina: 1.3 },
          'elderly': { stamina: 1.2, health: 1.2 }
        }
      },
      {
        id: 'tf-altitude',
        type: 'altitude',
        label: 'Steep Valley Descent & Climb',
        description: 'The falls sit in a deep valley. the return climb back up is grueling in tropical humidity, especially after swimming.',
        healthImpact: -10,
        staminaImpact: -30,
        moneyImpact: 0,
        personaMultipliers: {
          'elderly': { stamina: 1.8, health: 1.4 },
          'limited-stamina': { stamina: 2.0, health: 1.3 }
        }
      }
    ]
  },
  {
    id: 'lake-sebu',
    name: 'Lake Sebu',
    location: 'South Cotabato',
    region: 'mindanao',
    description: "Highland lake and home of the T'boli indigenous community.",
    imageUrl: '/landmarks/lake-sebu.jpg',
    mapCenter: [6.2041, 124.6972],
    mapZoom: 13,
    hiddenConditions: [
      {
        id: 'ls-altitude',
        type: 'altitude',
        label: '1,000m Highland Elevation',
        description: 'The lake sits at 1,000m above sea level. the winding mountain road causes motion sickness and the thin air tires visitors faster.',
        healthImpact: -10,
        staminaImpact: -20,
        moneyImpact: -100,
        personaMultipliers: {
          'elderly': { stamina: 1.5, health: 1.3 },
          'parent': { money: 1.3 }
        }
      },
      {
        id: 'ls-seating',
        type: 'seating',
        label: 'Basic Tourist Facilities',
        description: 'Rest areas and benches are scarce. the T\'boli community has limited tourism infrastructure around the lake shores.',
        healthImpact: -5,
        staminaImpact: -15,
        moneyImpact: -60,
        personaMultipliers: {
          'elderly': { stamina: 1.4, health: 1.2 },
          'limited-stamina': { stamina: 1.5 }
        }
      },
      {
        id: 'ls-terrain',
        type: 'terrain',
        label: 'Muddy Lakeside Paths',
        description: 'Walking paths around the lake and to the Seven Falls zipline are unpaved, muddy after rain, and extremely uneven.',
        healthImpact: -10,
        staminaImpact: -15,
        moneyImpact: 0,
        personaMultipliers: {
          'parent': { stamina: 1.3 },
          'elderly': { health: 1.3, stamina: 1.5 }
        }
      },
      {
        id: 'ls-transport',
        type: 'transport',
        label: 'Limited Public Transit',
        description: 'Only one daily bus from General Santos City and sporadic multicabs. getting stranded is a real risk if you miss the last trip.',
        healthImpact: 0,
        staminaImpact: -10,
        moneyImpact: -150,
        personaMultipliers: {
          'parent': { money: 1.4, stamina: 1.3 },
          'elderly': { money: 1.3, stamina: 1.4 }
        }
      },
      {
        id: 'ls-water',
        type: 'water',
        label: 'Lake Crossing by Dugout',
        description: 'Visiting the T\'boli weaving villages requires crossing the lake in a small motorized dugout canoe. no life vests provided.',
        healthImpact: -10,
        staminaImpact: -10,
        moneyImpact: -80,
        personaMultipliers: {
          'parent': { health: 1.5, money: 1.3 },
          'elderly': { health: 1.4, stamina: 1.2 }
        }
      },
      {
        id: 'ls-weather',
        type: 'weather',
        label: 'Highland Fog & Cold Rain',
        description: 'Morning fog reduces visibility and afternoon cold rain is common year-round at 1,000m. no warming shelters exist.',
        healthImpact: -15,
        staminaImpact: -10,
        moneyImpact: -30,
        personaMultipliers: {
          'elderly': { health: 1.5, stamina: 1.3 },
          'limited-stamina': { health: 1.3, stamina: 1.4 }
        }
      }
    ]
  }
];
