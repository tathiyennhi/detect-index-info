const tabs = [
  {
    id: 'sto',
    name: 'HOSE',
    // port: 5679,
    board: 'G1',
    // data: [
    //   {
    //     id: "sto",
    //     port: 5679,
    //     name: "STO",
    //   },
    //   {
    //     id: "bdo",
    //     port: 5680,
    //     name: "BDO",
    //   },
    //   {
    //     id: "rpo",
    //     port: 5685,
    //     name: "RPO",
    //   },
    // ],
  },
  {
    id: 'stx',
    name: 'HNX',
    // port: 5678,
    board: 'G1',
    // data: [
    //   {
    //     id: "stx",
    //     name: "STX",
    //     port: 5678,
    //   },
    //   {
    //     id: "hcx",
    //     port: 5683,
    //     name: "HCX",
    //   },
    //   {
    //     id: "fbx",
    //     port: 5690,
    //     name: "FBX",
    //   },
    // ],
  },
  {
    id: 'upx',
    name: 'UPCOM',
    // port: 5684,
    board: 'G1',
  },
  {
    id: 'dvx',
    name: 'Derivatives', //dvx
    // port: 5682,
    board: 'G1',
  },
  {
    id: 'cw',
    name: 'Covered Warrant',
    // port: 5689,
    board: 'G1',
  },
  {
    id: 'put-through',
    name: 'Put Through',
    data: [
      {
        id: 'put-through-sto',
        name: 'Put Through (HOSE)',
        // port: 5695,
      },
      {
        id: 'put-through-stx',
        name: 'Put Through (HNX)',
        // port: 5696,
      },
      {
        id: 'put-through-upx',
        name: 'Put Through (UPCOM)',
        // port: 5697,
      },
    ],
  },
  {
    id: 'odd-lot',
    name: 'Odd Lot',
    data: [
      {
        id: 'sto-odd',
        name: 'Odd lot HOSE',
        // port: 5686,
        board: 'G4',
      },
      {
        id: 'stx-odd',
        name: 'Odd lot HNX',
        // port: 5687,
        board: 'G4',
      },
      {
        id: 'upx-odd',
        name: 'Odd lot Upcom',
        // port: 5688,
        board: 'G4',
      },
    ],
  },
  {
    id: 'private-corporate-bonds',
    name: 'Private Corporate Bonds',
    // port: 5691,
  },
  {
    id: 'buy-in',
    name: 'Buy-In',
    board: 'G7',
    data: [
      {
        id: 'sto-buy-in',
        name: 'Buy-In HOSE',
        // port: 5692,
        board: 'G7',
      },
      {
        id: 'stx-buy-in',
        name: 'Buy-In HNX',
        // port: 5693,
        board: 'G7',
      },
      {
        id: 'upx-buy-in',
        name: 'Buy-In Upcom',
        // port: 5694,
        board: 'G7',
      },
    ],
  },
  {
    id: 'sector',
    name: 'Sector',
    board: 'G1',
    data: [
      {
        id: '1',
        name: 'Automobiles & Parts',
        board: 'G1',
      },
      {
        id: '2',
        name: 'Banks',
        board: 'G1',
      },
      {
        id: '3',
        name: 'Basic Resources',
        board: 'G1',
      },
      {
        id: '4',
        name: 'Chemicals',
        board: 'G1',
      },
      {
        id: '5',
        name: 'Construction & Materials',
        board: 'G1',
      },
      {
        id: '6',
        name: 'Financial Services',
        board: 'G1',
      },
      {
        id: '7',
        name: 'Food & Beverage',
        board: 'G1',
      },
      {
        id: '8',
        name: 'Health Care',
        board: 'G1',
      },
      {
        id: '9',
        name: 'Industrial Goods & Services',
        board: 'G1',
      },
      {
        id: '10',
        name: 'Insurance',
        board: 'G1',
      },
      {
        id: '11',
        name: 'Media',
        board: 'G1',
      },
      {
        id: '12',
        name: 'Oil & Gas',
        board: 'G1',
      },
      {
        id: '13',
        name: 'Personal & Household Goods',
        board: 'G1',
      },
      {
        id: '14',
        name: 'Real Estate',
        board: 'G1',
      },
      {
        id: '15',
        name: 'Retail',
        board: 'G1',
      },
      {
        id: '16',
        name: 'Technology',
        board: 'G1',
      },
      {
        id: '17',
        name: 'Telecommunications',
        board: 'G1',
      },
      {
        id: '18',
        name: 'Travel & Leisure',
        board: 'G1',
      },
      {
        id: '19',
        name: 'Utilities',
        board: 'G1',
      },
    ],
  },
];

module.exports = { tabs };
