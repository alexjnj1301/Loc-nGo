import {
  faBathtub,
  faBroom,
  faCoffee,
  faCouch, faKitchenSet,
  faMattressPillow, faPallet,
  faPersonSkiing,
  faRug,
  faSink, faToilet,
} from '@fortawesome/free-solid-svg-icons'

export interface Features {
  id: string
  name: string
  icon: string
  faIcon?: any
}

export const featuresItem: Features[] = [
  {
    id: 'TV',
    name: 'lieuDetails.items.tv',
    icon: 'tv'
  },
  {
    id: 'cafe',
    name: 'lieuDetails.items.cafe',
    icon: 'coffee'
  },
  {
    id: 'lit',
    name: 'lieuDetails.items.lit',
    icon: 'bed'
  },
  {
    id: 'wifi',
    name: 'lieuDetails.items.wifi',
    icon: 'wifi'
  },
  {
    id: 'vaisselle',
    name: 'lieuDetails.items.vaisselle',
    icon: '',
    faIcon: faCoffee
  },
  {
    id: 'draps',
    name: 'lieuDetails.items.draps',
    icon: '',
    faIcon: faMattressPillow
  },
  {
    id: 'serviettes',
    name: 'lieuDetails.items.serviettes',
    icon: '',
    faIcon: faRug
  },
  {
    id: 'parking',
    name: 'lieuDetails.items.parking',
    icon: 'local_parking'
  },
  {
    id: 'localSki',
    name: 'lieuDetails.items.localSki',
    icon: '',
    faIcon: faPersonSkiing
  },
  {
    id: 'keyBox',
    name: 'lieuDetails.items.keyBox',
    icon: 'key'
  },
  {
    id: 'cleaning',
    name: 'lieuDetails.items.cleaning',
    icon: '',
    faIcon: faBroom
  },
  {
    id: 'noAnimal',
    name: 'lieuDetails.items.noAnimal',
    icon: 'not_interested'
  },
  {
    id: 'laveVaisselle',
    name: 'lieuDetails.items.laveVaisselle',
    icon: '',
    faIcon: faSink
  },
  {
    id: 'microOnde',
    name: 'lieuDetails.items.microOnde',
    icon: 'microwave'
  },
  {
    id: 'four',
    name: 'lieuDetails.items.four',
    icon: 'microwave'
  },
  {
    id: 'refrigerateur',
    name: 'lieuDetails.items.refrigerateur',
    icon: 'kitchen'
  },
  {
    id: 'bouilloire',
    name: 'lieuDetails.items.bouilloire',
    icon: '',
    faIcon: faKitchenSet
  },
  {
    id: 'canapelit',
    name: 'lieuDetails.items.canapelit',
    icon: '',
    faIcon: faCouch
  },
  {
    id: 'balcon',
    name: 'lieuDetails.items.balcon',
    icon: '',
    faIcon: faPallet
  },
  {
    id: 'litdouble',
    name: 'lieuDetails.items.litdouble',
    icon: 'bed'
  },
  {
    id: 'litsimple',
    name: 'lieuDetails.items.litsimple',
    icon: 'bed'
  },
  {
    id: 'litsimplex2',
    name: 'lieuDetails.items.litsimplex2',
    icon: 'bed'
  },
  {
    id: 'litsimplex3',
    name: 'lieuDetails.items.litsimplex3',
    icon: 'bed'
  },
  {
    id: 'litsimplex4',
    name: 'lieuDetails.items.litsimplex4',
    icon: 'bed'
  },
  {
    id: 'litdoublex2',
    name: 'lieuDetails.items.litdoublex2',
    icon: 'bed'
  },
  {
    id: 'litdoublex3',
    name: 'lieuDetails.items.litdoublex3',
    icon: 'bed'
  },
  {
    id: 'litdoublex4',
    name: 'lieuDetails.items.litdoublex4',
    icon: 'bed'
  },
  {
    id: 'douche',
    name: 'lieuDetails.items.douche',
    icon: 'shower'
  },
  {
    id: 'baignoire',
    name: 'lieuDetails.items.baignoire',
    icon: '',
    faIcon: faBathtub
  },
  {
    id: 'toilettes',
    name: 'lieuDetails.items.toilettes',
    icon: '',
    faIcon: faToilet
  },
  {
    id: 'pets',
    name: 'lieuDetails.items.pets',
    icon: 'pets'
  },
  {
    id: 'smoking',
    name: 'lieuDetails.items.smoking',
    icon: 'smoking_rooms'
  },
  {
    id: 'noSmoking',
    name: 'lieuDetails.items.noSmoking',
    icon: 'smoke_free'
  }
]
