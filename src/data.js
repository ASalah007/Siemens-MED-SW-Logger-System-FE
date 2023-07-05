export const tss = [
  {
    metaData: {
      owner: "Merna Ashraf",
      version: "11.7.1",
      machine: "egc-med-einstein",
      compilation_mode: "Hybrid",
      platform: "VPS",
      solution: "Ethernet",
      tool_name: "EPGM",
      metaData: "Official Release",
      design_info: {
        dut_instance_info: {
          sa_configuration: [
            {
              id: 1,
              mii_enum: "XGMII",
              miiLaneNumber: 4,
              miiLaneWidth: 32,
              miiSpeed: 100,
              compiledFEC: "RS_FEC",
              miiWireDelay: 180,
            },
            {
              id: 2,
              mii_enum: "CGMII",
              miiLaneNumber: 1,
              miiLaneWidth: 32,
              miiSpeed: 100,
              compiledFEC: "FC_FEC",
              miiWireDelay: 3422,
            },
          ],
          mpg_configuration: [
            {
              id: 1,
              compiledFEC: "NO_FEC",
              mpgPortIdOffset: 0,
              mpgPortsNumber: 16,
              mpgLanesNumber: 4,
              mpgMaxLanesNumberList: 4,
              mpgLaneWidth: 32,
              mpgMaxLaneWidthList: 128,
              mpgOneG_ENABLED: 1,
              mpgWireDelay: 2207,
            },
            {
              id: 2,
              compiledFEC: "NO_FEC",
              mpgPortIdOffset: 11,
              mpgPortsNumber: 16,
              mpgLanesNumber: 1,
              mpgMaxLanesNumberList: 64,
              mpgLaneWidth: 64,
              mpgMaxLaneWidthList: 128,
              mpgOneG_ENABLED: 0,
              mpgWireDelay: 3856,
            },
            {
              id: 3,
              compiledFEC: "NO_FEC",
              mpgPortIdOffset: 1,
              mpgPortsNumber: 4,
              mpgLanesNumber: 16,
              mpgMaxLanesNumberList: 64,
              mpgLaneWidth: 128,
              mpgMaxLaneWidthList: 32,
              mpgOneG_ENABLED: 1,
              mpgWireDelay: 4048,
            },
            {
              id: 4,
              compiledFEC: "FC_FEC",
              mpgPortIdOffset: 17,
              mpgPortsNumber: 16,
              mpgLanesNumber: 16,
              mpgMaxLanesNumberList: 16,
              mpgLaneWidth: 96,
              mpgMaxLaneWidthList: 96,
              mpgOneG_ENABLED: 1,
              mpgWireDelay: 3206,
            },
          ],
        },
        dut_connectivity_map: {
          sa_connectivity_map: {
            1: "1",
          },
          mpg_connectivity_map: {
            1: "2",
            2: "1",
          },
        },
      },
    },
    status: false,
    testCaseRef: [
      "6491a75c8df9a44a6a2acc9f",
      "6491a75d8df9a44a6a2acd8f",
      "6491a75d8df9a44a6a2ace9a",
      "6491a75e8df9a44a6a2acfac",
      "6491a75f8df9a44a6a2ad0b0",
      "6491a7608df9a44a6a2ad383",
      "6491a7618df9a44a6a2ad764",
      "6491a7638df9a44a6a2adb3f",
      "6491a7648df9a44a6a2adf26",
      "6491a7658df9a44a6a2ae319",
      "6491a7658df9a44a6a2ae319",
      "6491a7658df9a44a6a2ae319",
      "6491a7658df9a44a6a2ae319",
      "6491a7658df9a44a6a2ae319",
      "6491a7658df9a44a6a2ae319",
      "6491a7658df9a44a6a2ae319",
      "6491a7658df9a44a6a2ae319",
      "6491a7658df9a44a6a2ae319",
      "6491a7658df9a44a6a2ae319",
      "6491a7658df9a44a6a2ae319",
      "6491a7658df9a44a6a2ae319",
      "6491a7658df9a44a6a2ae319",
      "6491a7658df9a44a6a2ae319",
      "6491a7658df9a44a6a2ae319",
      "6491a7658df9a44a6a2ae319",
      "6491a7658df9a44a6a2ae319",
      "6491a7658df9a44a6a2ae319",
      "6491a7658df9a44a6a2ae319",
      "6491a7658df9a44a6a2ae319",
      "6491a7658df9a44a6a2ae319",
      "6491a7658df9a44a6a2ae319",
      "6491a7658df9a44a6a2ae319",
      "6491a7658df9a44a6a2ae319",
      "6491a7658df9a44a6a2ae319",
      "6491a7658df9a44a6a2ae319",
      "6491a7658df9a44a6a2ae319",
      "6491a7658df9a44a6a2ae319",
      "6491a7658df9a44a6a2ae319",
      "6491a7658df9a44a6a2ae319",
      "6491a7658df9a44a6a2ae319",
      "6491a7658df9a44a6a2ae319",
      "6491a7658df9a44a6a2ae319",
      "6491a7658df9a44a6a2ae319",
      "6491a7658df9a44a6a2ae319",
      "6491a7658df9a44a6a2ae319",
      "6491a7658df9a44a6a2ae319",
      "6491a7658df9a44a6a2ae319",
      "6491a7658df9a44a6a2ae319",
      "6491a7658df9a44a6a2ae319",
      "6491a7658df9a44a6a2ae319",
      "6491a7658df9a44a6a2ae319",
      "6491a7658df9a44a6a2ae319",
      "6491a7658df9a44a6a2ae319",
      "6491a7658df9a44a6a2ae319",
      "6491a7658df9a44a6a2ae319",
      "6491a7658df9a44a6a2ae319",
      "6491a7658df9a44a6a2ae319",
      "6491a7658df9a44a6a2ae319",
      "6491a7658df9a44a6a2ae319",
      "6491a7658df9a44a6a2ae319",
      "6491a7658df9a44a6a2ae319",
      "6491a7658df9a44a6a2ae319",
      "6491a7658df9a44a6a2ae319",
      "6491a7658df9a44a6a2ae319",
      "6491a7658df9a44a6a2ae319",
      "6491a7658df9a44a6a2ae319",
      "6491a7658df9a44a6a2ae319",
      "6491a7658df9a44a6a2ae319",
      "6491a7658df9a44a6a2ae319",
      "6491a7658df9a44a6a2ae319",
      "6491a7658df9a44a6a2ae319",
      "6491a7658df9a44a6a2ae319",
      "6491a7658df9a44a6a2ae319",
    ],
    validationTagRefs: [],
    creation_date: "2023-06-20T14:19:24.534Z",
    __v: 0,
    end_date: "2023-06-20T14:19:27.906Z",
    testCases_count: 10,
    id: "6491a75c8df9a44a6a2acc9d",
  },
  {
    metaData: {
      owner: "Noha Gamal",
      version: "11.3.3",
      machine: "egc-med-berners",
      compilation_mode: "Simulation",
      platform: "Veloce",
      solution: "Ethernet",
      tool_name: "EPGM",
      metaData: "Official Release",
      design_info: {
        dut_instance_info: {
          sa_configuration: [
            {
              id: 1,
              mii_enum: "25GMII",
              miiLaneNumber: 16,
              miiLaneWidth: 128,
              miiSpeed: 100,
              compiledFEC: "NO_FEC",
              miiWireDelay: 499,
            },
            {
              id: 2,
              mii_enum: "GMII",
              miiLaneNumber: 16,
              miiLaneWidth: 64,
              miiSpeed: 1,
              compiledFEC: "FC_FEC",
              miiWireDelay: 3393,
            },
          ],
          mpg_configuration: [
            {
              id: 1,
              compiledFEC: "FC_FEC",
              mpgPortIdOffset: 18,
              mpgPortsNumber: 1,
              mpgLanesNumber: 1,
              mpgMaxLanesNumberList: 1,
              mpgLaneWidth: 64,
              mpgMaxLaneWidthList: 96,
              mpgOneG_ENABLED: 0,
              mpgWireDelay: 4194,
            },
            {
              id: 2,
              compiledFEC: "RS_FC_FEC",
              mpgPortIdOffset: 20,
              mpgPortsNumber: 8,
              mpgLanesNumber: 16,
              mpgMaxLanesNumberList: 8,
              mpgLaneWidth: 128,
              mpgMaxLaneWidthList: 64,
              mpgOneG_ENABLED: 1,
              mpgWireDelay: 2876,
            },
            {
              id: 3,
              compiledFEC: "NO_FEC",
              mpgPortIdOffset: 18,
              mpgPortsNumber: 16,
              mpgLanesNumber: 16,
              mpgMaxLanesNumberList: 1,
              mpgLaneWidth: 96,
              mpgMaxLaneWidthList: 128,
              mpgOneG_ENABLED: 0,
              mpgWireDelay: 884,
            },
          ],
        },
        dut_connectivity_map: {
          sa_connectivity_map: {
            1: "3",

            3: "4",

            4: "5",

            5: "7",

            7: "9",

            9: "1",
          },
          mpg_connectivity_map: {
            1: "2",
            2: "1",
            3: "3",
            5: "6",
            6: "5",
            7: "8",
            8: "7",
            9: "10",
            10: "9",
          },
        },
      },
    },
    status: true,
    testCaseRef: [
      "6491a7668df9a44a6a2ae537",
      "6491a7668df9a44a6a2ae635",
      "6491a7678df9a44a6a2ae739",
      "6491a7678df9a44a6a2ae836",
      "6491a7678df9a44a6a2ae941",
      "6491a7688df9a44a6a2aec0f",
      "6491a7698df9a44a6a2aeff6",
      "6491a76b8df9a44a6a2af3e3",
      "6491a76c8df9a44a6a2af7c4",
      "6491a76d8df9a44a6a2afbb1",
    ],
    validationTagRefs: [],
    creation_date: "2023-06-20T14:19:34.299Z",
    __v: 0,
    end_date: "2023-06-20T14:19:36.386Z",
    testCases_count: 10,
    id: "6491a7668df9a44a6a2ae535",
  },
];

export const tcs = [
  {
    _id: "6491a75c8df9a44a6a2acc9f",
    metaData: {
      macs_info: [
        {
          id: 29,
          mii_type: "thus",
        },
        {
          id: 39,
          mii_type: "issue",
        },
        {
          id: 31,
          mii_type: "name",
        },
      ],
      dut_master_slave_info: [
        {
          master_id: 40,
          slave_ids: [43, 3, 39],
        },
        {
          master_id: 32,
          slave_ids: [45],
        },
        {
          master_id: 21,
          slave_ids: [1, 62],
        },
      ],
      macs_configuration: {
        4: {
          streaming_type_configuration: {
            "Streaming Type": "Packet",
            "Packets Per Burst": "87",
          },
          wire_delay_configuration: {
            Enable: "False",
            Value: "1964",
          },
          gptp_configuration: {
            Enable: "False",
          },
          afdx_configuration: {
            "Packet Identifier": "0a88a38dfcf",
            "Error Injection": "True",
          },
          addresses_configuration: {
            Mode: "Static",
          },
        },
        14: {
          streaming_type_configuration: {
            "Streaming Type": "Bundle",
            "Packets Per Burst": "76",
          },
          wire_delay_configuration: {
            Enable: "True",
            Value: "2783",
          },
          gptp_configuration: {
            Enable: "True",
          },
          afdx_configuration: {
            "Packet Identifier": "0da50dc9f95",
            "Error Injection": "False",
          },
          addresses_configuration: {
            Mode: "Static",
          },
        },
        50: {
          streaming_type_configuration: {
            "Streaming Type": "Packet",
            "Packets Per Burst": "46",
          },
          wire_delay_configuration: {
            Enable: "False",
            Value: "861",
          },
          gptp_configuration: {
            Enable: "False",
          },
          afdx_configuration: {
            "Packet Identifier": "b8a256b8741",
            "Error Injection": "True",
          },
          addresses_configuration: {
            Mode: "Random",
          },
        },
      },
      mpg_configuration: {
        3: {
          ports_configuration: [
            {
              "Port Offset": "4",
              "Port Type": "peace",
            },
          ],
          fec_configuration: {
            Enable: "True",
          },
        },
        33: {
          ports_configuration: [
            {
              "Port Offset": "6",
              "Port Type": "blood",
            },
            {
              "Port Offset": "7",
              "Port Type": "necessary",
            },
          ],
          fec_configuration: {
            Enable: "True",
          },
        },
        67: {
          ports_configuration: [
            {
              "Port Offset": "1",
              "Port Type": "brother",
            },
            {
              "Port Offset": "8",
              "Port Type": "concern",
            },
          ],
          fec_configuration: {
            Enable: "False",
          },
        },
      },
    },
    status: true,
    parent: {
      testSuite: {
        id: "6491a75c8df9a44a6a2acc9d",
      },
    },
    validationTagRefs: [
      "6491a75c8df9a44a6a2acca4",
      "6491a75c8df9a44a6a2accf9",
      "6491a75d8df9a44a6a2acd3e",
      "6491a75f8df9a44a6a2ad1d2",
      "6491a7608df9a44a6a2ad279",
      "6491a7608df9a44a6a2ad314",
    ],
    creation_date: "2023-06-20T14:19:24.535Z",
    __v: 0,
    end_date: "2023-06-20T14:19:25.296Z",
  },
  {
    _id: "6491a75c8df9a44a6a2acc9f",
    metaData: {
      macs_info: [
        {
          id: 29,
          mii_type: "thus",
        },
        {
          id: 39,
          mii_type: "issue",
        },
        {
          id: 31,
          mii_type: "name",
        },
      ],
      dut_master_slave_info: [
        {
          master_id: 40,
          slave_ids: [43, 3, 39],
        },
        {
          master_id: 32,
          slave_ids: [45],
        },
        {
          master_id: 21,
          slave_ids: [1, 62],
        },
      ],
      macs_configuration: {
        4: {
          streaming_type_configuration: {
            "Streaming Type": "Packet",
            "Packets Per Burst": "87",
          },
          wire_delay_configuration: {
            Enable: "False",
            Value: "1964",
          },
          gptp_configuration: {
            Enable: "False",
          },
          afdx_configuration: {
            "Packet Identifier": "0a88a38dfcf",
            "Error Injection": "True",
          },
          addresses_configuration: {
            Mode: "Static",
          },
        },
        14: {
          streaming_type_configuration: {
            "Streaming Type": "Bundle",
            "Packets Per Burst": "76",
          },
          wire_delay_configuration: {
            Enable: "True",
            Value: "2783",
          },
          gptp_configuration: {
            Enable: "True",
          },
          afdx_configuration: {
            "Packet Identifier": "0da50dc9f95",
            "Error Injection": "False",
          },
          addresses_configuration: {
            Mode: "Static",
          },
        },
        50: {
          streaming_type_configuration: {
            "Streaming Type": "Packet",
            "Packets Per Burst": "46",
          },
          wire_delay_configuration: {
            Enable: "False",
            Value: "861",
          },
          gptp_configuration: {
            Enable: "False",
          },
          afdx_configuration: {
            "Packet Identifier": "b8a256b8741",
            "Error Injection": "True",
          },
          addresses_configuration: {
            Mode: "Random",
          },
        },
      },
      mpg_configuration: {
        3: {
          ports_configuration: [
            {
              "Port Offset": "4",
              "Port Type": "peace",
            },
          ],
          fec_configuration: {
            Enable: "True",
          },
        },
        33: {
          ports_configuration: [
            {
              "Port Offset": "6",
              "Port Type": "blood",
            },
            {
              "Port Offset": "7",
              "Port Type": "necessary",
            },
          ],
          fec_configuration: {
            Enable: "True",
          },
        },
        67: {
          ports_configuration: [
            {
              "Port Offset": "1",
              "Port Type": "brother",
            },
            {
              "Port Offset": "8",
              "Port Type": "concern",
            },
          ],
          fec_configuration: {
            Enable: "False",
          },
        },
      },
    },
    status: false,
    parent: {
      testSuite: {
        id: "6491a75c8df9a44a6a2acc9d",
      },
    },
    validationTagRefs: [
      "6491a75c8df9a44a6a2acca4",
      "6491a75c8df9a44a6a2accf9",
      "6491a75d8df9a44a6a2acd3e",
      "6491a75f8df9a44a6a2ad1d2",
      "6491a7608df9a44a6a2ad279",
      "6491a7608df9a44a6a2ad314",
    ],
    creation_date: "2023-06-20T14:19:24.535Z",
    __v: 0,
    end_date: "2023-06-20T14:19:25.296Z",
  },
];

export const vps = [
  {
    _id: "6491a75c8df9a44a6a2acca7",
    parent: {
      validationTag: {
        id: "6491a75c8df9a44a6a2acca4",
      },
      testCase: {
        id: "6491a75c8df9a44a6a2acc9f",
      },
      testSuite: {
        id: "6491a75c8df9a44a6a2acc9d",
      },
    },
    levelsOrder: ["mac", "direction"],
    results: [
      {
        name: "Total Flows",
        status: "fail",
        expected: 1210,
        actual: 110,
        tolerance: 1,
      },
    ],
    status: false,
    metaData: {
      "Additional Info": "No Additional Info supplied",
    },
    levels: {
      mac: 9,
      direction: "Rx",
    },
    modifiedLevels: {
      0: "mac:9",
      1: "direction:Rx",
    },
    creation_date: "2023-06-20T14:19:24.535Z",
    __v: 0,
  },
  {
    _id: "6491a75c8df9a44a6a2acca7",
    parent: {
      validationTag: {
        id: "6491a75c8df9a44a6a2acca4",
      },
      testCase: {
        id: "6491a75c8df9a44a6a2acc9f",
      },
      testSuite: {
        id: "6491a75c8df9a44a6a2acc9d",
      },
    },
    levelsOrder: ["mac", "direction"],
    results: [
      {
        name: "Total Flows",
        status: "fail",
        expected: 1210,
        actual: 110,
        tolerance: 1,
      },
    ],
    status: false,
    metaData: {
      "Additional Info": "No Additional Info supplied",
    },
    levels: {
      mac: 9,
      direction: "Rx",
    },
    modifiedLevels: {
      0: "mac:9",
      1: "direction:Rx",
    },
    creation_date: "2023-06-20T14:19:24.535Z",
    __v: 0,
  },
  {
    _id: "6491a75c8df9a44a6a2acca7",
    parent: {
      validationTag: {
        id: "6491a75c8df9a44a6a2acca4",
      },
      testCase: {
        id: "6491a75c8df9a44a6a2acc9f",
      },
      testSuite: {
        id: "6491a75c8df9a44a6a2acc9d",
      },
    },
    levelsOrder: ["mac", "direction"],
    results: [
      {
        name: "Total Flows",
        status: "fail",
        expected: 1210,
        actual: 110,
        tolerance: 1,
      },
    ],
    status: false,
    metaData: {
      "Additional Info": "No Additional Info supplied",
    },
    levels: {
      mac: 9,
      direction: "Rx",
    },
    modifiedLevels: {
      0: "mac:9",
      1: "direction:Rx",
    },
    creation_date: "2023-06-20T14:19:24.535Z",
    __v: 0,
  },
  {
    _id: "6491a75c8df9a44a6a2acca7",
    parent: {
      validationTag: {
        id: "6491a75c8df9a44a6a2acca4",
      },
      testCase: {
        id: "6491a75c8df9a44a6a2acc9f",
      },
      testSuite: {
        id: "6491a75c8df9a44a6a2acc9d",
      },
    },
    levelsOrder: ["mac", "direction"],
    results: [
      {
        name: "Total Flows",
        status: "fail",
        expected: 1210,
        actual: 110,
        tolerance: 1,
      },
    ],
    status: false,
    metaData: {
      "Additional Info": "No Additional Info supplied",
    },
    levels: {
      mac: 9,
      direction: "Rx",
    },
    modifiedLevels: {
      0: "mac:9",
      1: "direction:Rx",
    },
    creation_date: "2023-06-20T14:19:24.535Z",
    __v: 0,
  },
];

export const vts = [
  {
    _id: "6491a75c8df9a44a6a2acca4",
    metaData: {
      name: "Packet Fields Validation",
      metaData: {
        Description: "Packet Fields Validation is enabled ",
        "Executable Path":
          "/analyzers/analyzers_exec/ve_packetfieldsvalidation.o",
      },
    },
    status: true,
    parent: {
      testCase: {
        id: "6491a75c8df9a44a6a2acc9f",
      },
      testSuite: {
        id: "6491a75c8df9a44a6a2acc9d",
      },
    },
    validationPointRefs: [
      "6491a75c8df9a44a6a2acca7",
      "6491a75c8df9a44a6a2accb1",
      "6491a75c8df9a44a6a2accb8",
      "6491a75c8df9a44a6a2accbf",
      "6491a75c8df9a44a6a2accc6",
      "6491a75c8df9a44a6a2acccd",
      "6491a75c8df9a44a6a2accd4",
      "6491a75c8df9a44a6a2accdb",
      "6491a75c8df9a44a6a2acce2",
      "6491a75c8df9a44a6a2acce9",
      "6491a75c8df9a44a6a2accf0",
      "6491a75f8df9a44a6a2ad1a6",
      "6491a75f8df9a44a6a2ad1ac",
      "6491a75f8df9a44a6a2ad1b2",
      "6491a75f8df9a44a6a2ad1b8",
      "6491a75f8df9a44a6a2ad1be",
      "6491a75f8df9a44a6a2ad1c4",
      "6491a75f8df9a44a6a2ad1ca",
    ],
    creation_date: "2023-06-20T14:19:24.535Z",
    __v: 0,
    end_date: "2023-06-20T14:19:24.915Z",
  },
  {
    _id: "6491a75c8df9a44a6a2acca4",
    metaData: {
      name: "Packet Fields Validation",
      metaData: {
        Description: "Packet Fields Validation is enabled ",
        "Executable Path":
          "/analyzers/analyzers_exec/ve_packetfieldsvalidation.o",
      },
    },
    status: true,
    parent: {
      testCase: {
        id: "6491a75c8df9a44a6a2acc9f",
      },
      testSuite: {
        id: "6491a75c8df9a44a6a2acc9d",
      },
    },
    validationPointRefs: [
      "6491a75c8df9a44a6a2acca7",
      "6491a75c8df9a44a6a2accb1",
      "6491a75c8df9a44a6a2accb8",
      "6491a75c8df9a44a6a2accbf",
      "6491a75c8df9a44a6a2accc6",
      "6491a75c8df9a44a6a2acccd",
      "6491a75c8df9a44a6a2accd4",
      "6491a75c8df9a44a6a2accdb",
      "6491a75c8df9a44a6a2acce2",
      "6491a75c8df9a44a6a2acce9",
      "6491a75c8df9a44a6a2accf0",
      "6491a75f8df9a44a6a2ad1a6",
      "6491a75f8df9a44a6a2ad1ac",
      "6491a75f8df9a44a6a2ad1b2",
      "6491a75f8df9a44a6a2ad1b8",
      "6491a75f8df9a44a6a2ad1be",
      "6491a75f8df9a44a6a2ad1c4",
      "6491a75f8df9a44a6a2ad1ca",
    ],
    creation_date: "2023-06-20T14:19:24.535Z",
    __v: 0,
    end_date: "2023-06-20T14:19:24.915Z",
  },
  {
    _id: "6491a75c8df9a44a6a2acca4",
    metaData: {
      name: "Packet Fields Validation",
      metaData: {
        Description: "Packet Fields Validation is enabled ",
        "Executable Path":
          "/analyzers/analyzers_exec/ve_packetfieldsvalidation.o",
      },
    },
    status: false,
    parent: {
      testCase: {
        id: "6491a75c8df9a44a6a2acc9f",
      },
      testSuite: {
        id: "6491a75c8df9a44a6a2acc9d",
      },
    },
    validationPointRefs: [
      "6491a75c8df9a44a6a2acca7",
      "6491a75c8df9a44a6a2accb1",
      "6491a75c8df9a44a6a2accb8",
      "6491a75c8df9a44a6a2accbf",
      "6491a75c8df9a44a6a2accc6",
      "6491a75c8df9a44a6a2acccd",
      "6491a75c8df9a44a6a2accd4",
      "6491a75c8df9a44a6a2accdb",
      "6491a75c8df9a44a6a2acce2",
      "6491a75c8df9a44a6a2acce9",
      "6491a75c8df9a44a6a2accf0",
      "6491a75f8df9a44a6a2ad1a6",
      "6491a75f8df9a44a6a2ad1ac",
      "6491a75f8df9a44a6a2ad1b2",
      "6491a75f8df9a44a6a2ad1b8",
      "6491a75f8df9a44a6a2ad1be",
      "6491a75f8df9a44a6a2ad1c4",
      "6491a75f8df9a44a6a2ad1ca",
    ],
    creation_date: "2023-06-20T14:19:24.535Z",
    __v: 0,
    end_date: "2023-06-20T14:19:24.915Z",
  },
];

export const databases = [
  "Database1",
  "Database2",
  "Database3",
  "Database4",
  "Database5",
];
