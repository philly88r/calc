// Default barbed wire type and point
export const DEFAULT_BARBED_WIRE_GAUGE = "15.5 gauge (high tensile)";
export const DEFAULT_BARBED_WIRE_POINT = "4 point gaucho";

// Post costs
export const postCosts = {
  "Black": {
    "0.065": {
      "1 3/8": {
        "20ft": { price: 19.86, sku: "12017" },
        "21ft": { price: 28.94, sku: "12014" }
      },
      "1 5/8": {
        "6ft": { price: 10.81, sku: "12005" },
        "7ft": { price: 17.46, sku: "12008" },
        "8ft": { price: 17.47, sku: "12011" },
        "20ft": { price: 37.00, sku: "12018" },
        "21ft": { price: 52.25, sku: "12015" },
        "22ft": { price: 44.91, sku: "12016" }
      },
      "1 7/8": {
        "6ft": { price: 11.99, sku: "12006" },
        "7ft": { price: 18.11, sku: "12009" },
        "8ft": { price: 20.70, sku: "12012" },
        "20ft": { price: 0.00, sku: "12019" }
      },
      "2 3/8": {
        "6ft": { price: 14.02, sku: "12007" },
        "7ft": { price: 16.35, sku: "12010" },
        "8ft": { price: 26.62, sku: "12013" },
        "20ft": { price: 0.00, sku: "12020" }
      }
    },
    "SCH 20": {
      "1 5/8": {
        "1ft": { price: 2.94, sku: "12201" },
        "6ft": { price: 17.55, sku: "12204" },
        "7ft": { price: 14.77, sku: "12207" },
        "8ft": { price: 16.87, sku: "12210" },
        "10.5ft": { price: 0.00, sku: "12213" },
        "20ft": { price: 43.78, sku: "12222" },
        "21ft": { price: 43.95, sku: "12216" },
        "24ft": { price: 60.84, sku: "12219" }
      },
      "1 7/8": {
        "1ft": { price: 3.42, sku: "12202" },
        "6ft": { price: 14.91, sku: "12205" },
        "7ft": { price: 16.90, sku: "12208" },
        "8ft": { price: 19.91, sku: "12211" },
        "10.5ft": { price: 27.20, sku: "12214" },
        "20ft": { price: 0.00, sku: "12223" },
        "21ft": { price: 71.80, sku: "12217" },
        "24ft": { price: 74.57, sku: "12220" }
      },
      "2 3/8": {
        "1ft": { price: 3.61, sku: "12203" },
        "6ft": { price: 21.06, sku: "12206" },
        "7ft": { price: 25.30, sku: "12209" },
        "8ft": { price: 24.49, sku: "12212" },
        "10.5ft": { price: 0.00, sku: "12215" },
        "20ft": { price: 0.00, sku: "12224" },
        "21ft": { price: 75.89, sku: "12218" },
        "24ft": { price: 89.55, sku: "12221" }
      }
    },
    "SCH 40": {
      "1 5/8": {
        "6ft": { price: 51.87, sku: "12406" },
        "7ft": { price: 31.58, sku: "12411" },
        "8ft": { price: 36.09, sku: "12416" },
        "9ft": { price: 0.00, sku: "12421" },
        "10.5ft": { price: 45.11, sku: "12426" },
        "12ft": { price: 0.00, sku: "12431" },
        "20ft": { price: 54.09, sku: "12446" },
        "21ft": { price: 57.55, sku: "12436" },
        "24ft": { price: 108.58, sku: "12441" }
      },
      "1 7/8": {
        "6ft": { price: 31.67, sku: "12407" },
        "7ft": { price: 36.95, sku: "12412" },
        "8ft": { price: 30.51, sku: "12417" },
        "9ft": { price: 0.00, sku: "12422" },
        "10.5ft": { price: 39.77, sku: "12427" },
        "12ft": { price: 0.00, sku: "12432" },
        "20ft": { price: 0.00, sku: "12447" },
        "21ft": { price: 110.84, sku: "12437" },
        "24ft": { price: 126.67, sku: "12442" }
      },
      "2 3/8": {
        "6ft": { price: 35.49, sku: "12408" },
        "7ft": { price: 41.41, sku: "12413" },
        "8ft": { price: 39.41, sku: "12418" },
        "9ft": { price: 0.00, sku: "12423" },
        "10.5ft": { price: 55.55, sku: "12428" },
        "12ft": { price: 72.44, sku: "12433" },
        "20ft": { price: 97.19, sku: "12448" },
        "21ft": { price: 124.22, sku: "12438" },
        "24ft": { price: 144.87, sku: "12443" }
      },
      "2 7/8": {
        "6ft": { price: 56.08, sku: "12409" },
        "7ft": { price: 65.43, sku: "12414" },
        "8ft": { price: 60.33, sku: "12419" },
        "9ft": { price: 0.00, sku: "12424" },
        "10.5ft": { price: 89.49, sku: "12429" },
        "12ft": { price: 90.50, sku: "12434" },
        "20ft": { price: 0.00, sku: "12449" },
        "21ft": { price: 196.29, sku: "12439" },
        "24ft": { price: 203.94, sku: "12444" }
      },
      "4": {
        "6ft": { price: 116.45, sku: "12410" },
        "7ft": { price: 135.86, sku: "12415" },
        "8ft": { price: 93.13, sku: "12420" },
        "9ft": { price: 0.00, sku: "12425" },
        "10.5ft": { price: 203.80, sku: "12430" },
        "12ft": { price: 139.69, sku: "12435" },
        "20ft": { price: 0.00, sku: "12450" },
        "21ft": { price: 407.59, sku: "12440" },
        "24ft": { price: 398.16, sku: "12445" }
      }
    }
  },
  "Galvanized": {
    "0.065": {
      "1 3/8": {
        "20ft": { price: 21.57, sku: "13017" },
        "21ft": { price: 25.66, sku: "13014" }
      },
      "1 5/8": {
        "6ft": { price: 9.49, sku: "13005" },
        "7ft": { price: 13.65, sku: "13008" },
        "8ft": { price: 10.27, sku: "13011" },
        "20ft": { price: 29.16, sku: "13018" },
        "21ft": { price: 38.90, sku: "13015" },
        "22ft": { price: 32.65, sku: "13016" }
      },
      "1 7/8": {
        "6ft": { price: 10.49, sku: "13006" },
        "7ft": { price: 15.93, sku: "13009" },
        "8ft": { price: 15.08, sku: "13012" },
        "20ft": { price: 0.00, sku: "13019" }
      },
      "2 3/8": {
        "6ft": { price: 13.13, sku: "13007" },
        "7ft": { price: 13.65, sku: "13010" },
        "8ft": { price: 20.18, sku: "13013" },
        "20ft": { price: 0.00, sku: "13020" }
      }
    },
    "SCH 20": {
      "1 3/8": {
        "6ft": 10.86,
        "7ft": 12.67,
        "8ft": 14.48,
        "20ft": 36.2
      },
      "1 5/8": {
        "6ft": { price: 13.73, sku: "13204" },
        "7ft": { price: 13.21, sku: "13207" },
        "8ft": { price: 14.82, sku: "13210" },
        "10.5ft": { price: 24.02, sku: "13213" },
        "20ft": { price: 33.23, sku: "13222" },
        "21ft": { price: 45.79, sku: "13216" },
        "24ft": { price: 59.59, sku: "13219" }
      },
      "1 7/8": {
        "6ft": { price: 15.37, sku: "13205" },
        "7ft": { price: 14.26, sku: "13208" },
        "8ft": { price: 16.01, sku: "13211" },
        "10.5ft": { price: 21.28, sku: "13214" },
        "20ft": { price: 0.00, sku: "13223" },
        "21ft": { price: 49.96, sku: "13217" },
        "24ft": { price: 61.58, sku: "13220" }
      },
      "2 3/8": {
        "6ft": { price: 20.35, sku: "13206" },
        "7ft": { price: 23.74, sku: "13209" },
        "8ft": { price: 23.06, sku: "13212" },
        "10.5ft": { price: 25.63, sku: "13215" },
        "20ft": { price: 0.00, sku: "13224" },
        "21ft": { price: 63.06, sku: "13218" },
        "24ft": { price: 67.63, sku: "13221" }
      }
    },
    "Commercial SCH 40": {
      "2 3/8": {
        "6ft": { price: 35.49, sku: "13602" },
        "7ft": { price: 41.41, sku: "13603" },
        "8ft": { price: 31.92, sku: "13604" },
        "9ft": { price: 0.00, sku: "13605" },
        "10.5ft": { price: 41.90, sku: "13606" },
        "12ft": { price: 44.46, sku: "13607" },
        "21ft": { price: 85.18, sku: "13608" },
        "24ft": { price: 104.83, sku: "13609" }
      },
      "2 7/8": {
        "6ft": { price: 40.95, sku: "13611" },
        "7ft": { price: 47.78, sku: "13612" },
        "8ft": { price: 52.00, sku: "13613" },
        "9ft": { price: 0.00, sku: "13614" },
        "10.5ft": { price: 69.83, sku: "13615" },
        "12ft": { price: 78.00, sku: "13616" },
        "21ft": { price: 143.33, sku: "13617" },
        "24ft": { price: 180.65, sku: "13618" }
      },
      "4": {
        "6ft": { price: 82.06, sku: "13620" },
        "7ft": { price: 95.73, sku: "13621" },
        "8ft": { price: 109.41, sku: "13622" },
        "9ft": { price: 0.00, sku: "13623" },
        "10.5ft": { price: 88.20, sku: "13624" },
        "12ft": { price: 93.60, sku: "13625" },
        "21ft": { price: 287.20, sku: "13626" },
        "24ft": { price: 251.49, sku: "13627" }
      }
    },
    "Industrial SCH 40": {
      "1 5/8": {
        "6ft": { price: 13.57, sku: "13402" },
        "7ft": { price: 15.83, sku: "13403" },
        "8ft": { price: 18.10, sku: "13404" },
        "9ft": { price: 20.36, sku: "13409" },
        "10.5ft": { price: 23.75, sku: "13405" },
        "12ft": { price: 27.14, sku: "13408" },
        "20ft": { price: 43.33, sku: "13410" },
        "21ft": { price: 56.78, sku: "13406" },
        "24ft": { price: 54.29, sku: "13407" }
      },
      "1 7/8": {
        "6ft": { price: 19.66, sku: "13412" },
        "7ft": { price: 22.93, sku: "13413" },
        "8ft": { price: 24.54, sku: "13414" },
        "9ft": { price: 22.95, sku: "13419" },
        "10.5ft": { price: 31.66, sku: "13415" },
        "12ft": { price: 39.31, sku: "13418" },
        "20ft": { price: 0.00, sku: "13420" },
        "21ft": { price: 68.80, sku: "13416" },
        "24ft": { price: 78.62, sku: "13417" }
      },
      "2 3/8": {
        "6ft": { price: 24.76, sku: "13422" },
        "7ft": { price: 28.88, sku: "13423" },
        "8ft": { price: 34.50, sku: "13424" },
        "9ft": { price: 44.76, sku: "13429" },
        "10.5ft": { price: 49.88, sku: "13425" },
        "12ft": { price: 55.19, sku: "13428" },
        "14ft": { price: 49.38, sku: "13431" },
        "16ft": { price: 56.28, sku: "13432" },
        "20ft": { price: 79.29, sku: "13430" },
        "21ft": { price: 86.47, sku: "13426" },
        "24ft": { price: 108.22, sku: "13427" }
      },
      "2 7/8": {
        "6ft": { price: 31.50, sku: "13434" },
        "7ft": { price: 0.00, sku: "13435" },
        "8ft": { price: 0.00, sku: "13436" },
        "9ft": { price: 56.76, sku: "13441" },
        "10.5ft": { price: 69.33, sku: "13437" },
        "12ft": { price: 64.64, sku: "13440" },
        "14ft": { price: 73.50, sku: "13443" },
        "16ft": { price: 84.00, sku: "13444" },
        "18ft": { price: 94.32, sku: "13445" },
        "20ft": { price: 0.00, sku: "13442" },
        "21ft": { price: 0.00, sku: "13438" },
        "24ft": { price: 0.00, sku: "13439" }
      },
      "4": {
        "6ft": { price: 45.00, sku: "13447" },
        "7ft": { price: 0.00, sku: "13448" },
        "8ft": { price: 0.00, sku: "13449" },
        "9ft": { price: 67.50, sku: "13454" },
        "10.5ft": { price: 123.70, sku: "13450" },
        "11ft": { price: 81.59, sku: "13456" },
        "12ft": { price: 88.04, sku: "13453" },
        "14ft": { price: 103.96, sku: "13457" },
        "16ft": { price: 118.81, sku: "13458" },
        "20ft": { price: 0.00, sku: "13455" },
        "21ft": { price: 0.00, sku: "13451" },
        "24ft": { price: 0.00, sku: "13452" }
      },
      "6 5/8": {
        "12ft": { price: 285.28, sku: "13460" },
        "24ft": { price: 570.56, sku: "13459" }
      }
    },
    "High zinc": {
      "2 3/8": {
        "6ft": 27.6,
        "7ft": 32.2,
        "8ft": 36.8,
        "20ft": 92.0
      },
      "2 7/8": {
        "6ft": 33.0,
        "7ft": 38.5,
        "8ft": 44.0,
        "20ft": 110.0
      },
      "4": {
        "6ft": 53.4,
        "7ft": 62.3,
        "8ft": 71.2,
        "20ft": 178.0
      }
    }
  }
};

// Mesh costs
export const meshCosts = {
  "Black": {
    "Residential 9 gauge": {
      "4'": { price: 96.80, sku: "11001" },
      "5'": { price: 153.00, sku: "11002" },
      "6'": { price: 169.01, sku: "11003" },
      "7'": { price: 0.00, sku: "11004" },
      "8'": { price: 258.00, sku: "11005" }
    },
    "Commercial 8 gauge": {
      "4'": { price: 160.00, sku: "11006" },
      "5'": { price: 406.25, sku: "11007" },
      "6'": { price: 308.95, sku: "11008" },
      "7'": { price: 309.20, sku: "11009" },
      "8'": { price: 315.00, sku: "11010" }
    }
  },
  "Galvanized": {
    "Residential 11.5 gauge": {
      "4'": { price: 120.15, sku: "11501" },
      "5'": { price: 154.00, sku: "11502" },
      "6'": { price: 180.00, sku: "11503" }
    },
    "Commercial 9 gauge": {
      "4'": { price: 163.15, sku: "11504" },
      "5'": { price: 230.75, sku: "11505" },
      "6'": { price: 220.00, sku: "11506" },
      "7'": { price: 273.35, sku: "11507" },
      "8'": { price: 346.99, sku: "11508" },
      "10'": { price: 440.00, sku: "11509" },
      "12'": { price: 513.00, sku: "11510" },
      "14'": { price: 918.75, sku: "11511" }
    }
  }
};

// Dome cap costs
export const domeCapCosts = {
  "Black": {
    "1 3/8": { price: 0.84, sku: "10061" },
    "1 5/8": { price: 1.16, sku: "10062" },
    "1 7/8": { price: 6.22, sku: "10063" },
    "2 3/8": { price: 1.86, sku: "10064" },
    "2 7/8": { price: 2.46, sku: "10065" },
    "4": { price: 3.72, sku: "10066" },
    "4 1/2": { price: 10.00, sku: "10067" },
    "6 5/8": { price: 17.25, sku: "10068" }
  },
  "Galvanized": {
    "1 3/8": { price: 1.46, sku: "10069" },
    "1 5/8": { price: 0.88, sku: "10070" },
    "1 7/8": { price: 1.62, sku: "10071" },
    "2 3/8": { price: 1.32, sku: "10072" },
    "2 7/8": { price: 1.76, sku: "10073" },
    "4": { price: 4.16, sku: "10074" },
    "4 1/2": { price: 7.98, sku: "10075" },
    "6 5/8": { price: 12.30, sku: "10076" }
  }
};

// Fence ties costs (100 pc)
export const fenceTiesCosts = {
  "Aluminium/Steel coated black": {
    "8 1/4\"": { price: 16.00, sku: "10091" },
    "6 1/2\"": { price: 18.00, sku: "10092" }
  },
  "Aluminum/Steel": {
    "8 1/4\"": { price: 25.00, sku: "10093" },
    "6 1/2\"": { price: 16.00, sku: "10094" }
  }
};

// Fence sleeve / Pipe sleeve costs
export const fenceSleeveCosts = {
  "Black": {
    "1 5/8\" × 6\"": { price: 3.24, sku: "10087" }
  },
  "Galvanized": {
    "1 3/8\" × 6\"": { price: 2.30, sku: "10088" },
    "1 5/8\" × 6\"": { price: 2.52, sku: "10089" }
  }
};

// Hog rings costs (1lb)
export const hogRingsCosts = {
  "Black": {
    "9 gauge": { price: 5.64, sku: "10151" },
    "12.5 gauge": { price: 11.96, sku: "10152" }
  },
  "Galvanized": {
    "9 gauge": { price: 4.60, sku: "10153" },
    "12.5 gauge": { price: 3.60, sku: "10154" }
  }
};

// Wedge anchor costs - 1/2" x 3 3/4"
export const wedgeAnchorCosts = {
  "Black": { price: 0.94, sku: "10155" },
  "Galvanized": { price: 23.98, sku: "40512" }
};

// Eye tops / loop caps costs
export const eyeTopsCosts = {
  "Black": {
    "1 5/8": {
      "1 3/8": { price: 1.64, sku: "10161" },
      "1 5/8": { price: 2.50, sku: "10162" }
    },
    "1 7/8": {
      "1 3/8": { price: 4.36, sku: "10163" },
      "1 5/8": { price: 2.94, sku: "10164" }
    },
    "2 3/8": {
      "1 3/8": null,
      "1 5/8": { price: 2.96, sku: "10165" }
    },
    "2 7/8": {
      "1 3/8": null,
      "1 5/8": { price: 6.56, sku: "10166" }
    },
    "4": {
      "1 3/8": null,
      "1 5/8": { price: 8.90, sku: "10167" }
    }
  },
  "Galvanized": {
    "1 5/8": {
      "1 3/8": { price: 2.42, sku: "10168" },
      "1 5/8": { price: 2.26, sku: "10169" }
    },
    "1 7/8": {
      "1 3/8": { price: 2.50, sku: "10170" },
      "1 5/8": { price: 1.72, sku: "10171" }
    },
    "2 3/8": {
      "1 3/8": null,
      "1 5/8": { price: 2.56, sku: "10172" }
    },
    "2 7/8": {
      "1 3/8": null,
      "1 5/8": { price: 5.20, sku: "10173" }
    },
    "4": {
      "1 3/8": null,
      "1 5/8": { price: 8.52, sku: "10174" }
    }
  }
};

// Sliding gate roller price
export const rollerPrice = { price: 85.00, sku: "10046" }; // Each gate needs 4 rollers

// Barbed wire costs
export const barbedWireCosts = {
  "12.5 gauge (low tensile)": {
    "Slick line": { price: 105.00, sku: "10011" },
    "2 point gaucho": { price: 113.78, sku: "10015" },
    "4 point gaucho": { price: 76.05, sku: "10013" }
  },
  "15.5 gauge (high tensile)": {
    "2 point gaucho": { price: 116.40, sku: "10012" },
    "4 point gaucho": { price: 77.62, sku: "10014" }
  }
};

// Brace bands costs
export const braceBandsCosts = {
  "Black": {
    "1 3/8": { price: 1.56, sku: "10016" },
    "1 5/8": { price: 1.70, sku: "10017" },
    "1 7/8": { price: 1.86, sku: "10018" },
    "2 3/8": { price: 0.88, sku: "10019" },
    "2 7/8": { price: 1.32, sku: "10020" },
    "4": { price: 2.04, sku: "10021" },
    "4 1/2": { price: 4.20, sku: "10022" },
    "6 5/8": { price: 5.99, sku: "10023" }
  },
  "Galvanized": {
    "1 3/8": { price: 0.84, sku: "10024" },
    "1 5/8": { price: 0.70, sku: "10025" },
    "1 7/8": { price: 1.12, sku: "10026" },
    "2 3/8": { price: 1.38, sku: "10027" },
    "2 7/8": { price: 0.86, sku: "10028" },
    "4": { price: 1.60, sku: "10029" },
    "4 1/2": { price: 2.50, sku: "10030" },
    "6 5/8": { price: 3.50, sku: "10031" }
  }
};

// Cantilever latch costs
export const cantileverLatchCosts = {
  "2 7/8": { price: 18.50, sku: "10041" },
  "4": { price: 23.14, sku: "10042" }
};

// Cantilever roller costs
export const cantileverRollerCosts = {
  "4": { price: 85.00, sku: "10046" }
};

// Industrial swing latch costs
export const industrialSwingLatchCosts = {
  "Galvanized": { price: 42.75, sku: "10264" }
};

// Duckbill latch costs
export const duckbillLatchCosts = {
  "Galvanized": { price: 17.50, sku: "10263" }
};

// Collar costs
export const collarCosts = {
  "Black": {
    "1 3/8": { price: 4.20, sku: "10051" },
    "1 5/8": { price: 4.90, sku: "10052" },
    "1 7/8": { price: 5.96, sku: "10053" }
  },
  "Galvanized": {
    "1 3/8": { price: 2.58, sku: "10054" },
    "1 5/8": { price: 1.15, sku: "10055" },
    "1 7/8": { price: 2.84, sku: "10056" }
  }
};

// Tension band costs
export const tensionBandCosts = {
  "Black": {
    "1 3/8": { price: 1.72, sku: "10201" },
    "1 5/8": { price: 0.86, sku: "10202" },
    "1 7/8": { price: 1.60, sku: "10203" },
    "2 3/8": { price: 1.16, sku: "10204" },
    "2 7/8": { price: 1.30, sku: "10205" },
    "4": { price: 1.65, sku: "10206" },
    "4 1/2": { price: 4.00, sku: "10207" },
    "6 5/8": { price: 7.98, sku: "10208" }
  },
  "Galvanized": {
    "1 3/8": { price: 0.92, sku: "10209" },
    "1 5/8": { price: 0.70, sku: "10210" },
    "1 7/8": { price: 1.18, sku: "10211" },
    "2 3/8": { price: 1.16, sku: "10212" },
    "2 7/8": { price: 1.43, sku: "10213" },
    "4": { price: 1.40, sku: "10214" },
    "4 1/2": { price: 3.50, sku: "10215" },
    "6 5/8": { price: 4.62, sku: "10216" }
  }
};

// Tension bar costs
export const tensionBarCosts = {
  "Black": {
    "4'": { price: 5.28, sku: "10221" },
    "5'": { price: 6.20, sku: "10222" },
    "6'": { price: 11.38, sku: "10223" },
    "7'": { price: 15.66, sku: "10224" },
    "8'": { price: 16.90, sku: "10225" }
  },
  "Galvanized": {
    "4'": { price: 5.31, sku: "10231" },
    "5'": { price: 7.59, sku: "10232" },
    "6'": { price: 7.19, sku: "10233" },
    "7'": { price: 8.68, sku: "10234" },
    "8'": { price: 9.00, sku: "10235" },
    "10'": { price: 12.18, sku: "10237" },
    "12'": { price: 13.16, sku: "10239" }
  }
};

// Fork latch costs
export const forkLatchCosts = {
  "Black": {
    "1 3/8": { price: 3.00, sku: "10096" },
    "1 5/8": { price: 3.00, sku: "10097" },
    "1 7/8": { price: 2.84, sku: "10098" },
    "2 3/8": { price: 3.40, sku: "10099" },
    "2 7/8": { price: 3.20, sku: "10100" },
    "4": { price: 7.88, sku: "10101" }
  },
  "Galvanized": {
    "1 3/8": { price: 2.12, sku: "10102" },
    "1 5/8": { price: 4.37, sku: "10103" },
    "1 7/8": { price: 2.84, sku: "10104" },
    "2 3/8": { price: 2.66, sku: "10105" },
    "2 7/8": { price: 2.98, sku: "10106" },
    "4": { price: 5.78, sku: "10107" }
  }
};

// Industrial hinge costs
export const industrialHingeCosts = {
  "Black": {
    "2 3/8": { price: 29.46, sku: "10111" },
    "2 7/8": { price: 30.36, sku: "10112" },
    "4": { price: 39.36, sku: "10113" }
  },
  "Galvanized": {
    "2 3/8": { price: 18.48, sku: "10114" },
    "2 7/8": { price: 20.96, sku: "10115" },
    "4": { price: 18.20, sku: "10116" }
  }
};

// Bulldog hinge costs
export const bulldogHingeCosts = {
  "Black": {
    "2 3/8": { price: 20.00, sku: "10121" },
    "2 7/8": { price: 17.36, sku: "10122" },
    "4": { price: 59.88, sku: "10123" },
    "6 5/8": { price: 0.00, sku: "10127" }
  },
  "Galvanized": {
    "2 3/8": { price: 15.60, sku: "10124" },
    "2 7/8": { price: 14.30, sku: "10125" },
    "4": { price: 23.01, sku: "10126" },
    "6 5/8": { price: 29.52, sku: "10128" }
  }
};

// Female gate hinge costs
export const femaleGateHingeCosts = {
  "Black": {
    "1 3/8": { price: 2.58, sku: "10131" },
    "1 5/8": { price: 2.91, sku: "10132" },
    "1 7/8": { price: 3.58, sku: "10133" }
  },
  "Galvanized": {
    "1 3/8": { price: 2.22, sku: "10134" },
    "1 5/8": { price: 1.92, sku: "10135" },
    "1 7/8": { price: 2.96, sku: "10136" }
  }
};

// Male gate hinge costs
export const maleGateHingeCosts = {
  "Black": {
    "1 7/8": { price: 5.30, sku: "10141" },
    "2 3/8": { price: 3.66, sku: "10142" },
    "2 7/8": { price: 6.46, sku: "10143" }
  },
  "Galvanized": {
    "1 7/8": { price: 5.00, sku: "10144" },
    "2 3/8": { price: 3.46, sku: "10145" },
    "2 7/8": { price: 4.98, sku: "10146" },
    "4": { price: 7.96, sku: "10147" }
  }
};

// Industrial drop rod latch costs
export const industrialDropRodLatchCosts = {
  "1 5/8": { price: 49.13, sku: "10156" },
  "1 7/8": { price: 52.13, sku: "10157" }
};

// Industrial guide costs
export const industrialGuideCosts = {
  "1 5/8": { price: 9.11, sku: "10158" },
  "1 7/8": { price: 5.25, sku: "10159" }
};

// Rail end costs
export const railEndCosts = {
  "Black": {
    "1 3/8": { price: 1.40, sku: "10191" },
    "1 5/8": { price: 1.56, sku: "10192" }
  },
  "Galvanized": {
    "1 3/8": { price: 2.38, sku: "10193" },
    "1 5/8": { price: 1.52, sku: "10194" }
  }
};

// Rail clamps costs
export const railClampsCosts = {
  "Black": {
    "Line": {
      "2 3/8 x 1 7/8": { price: 0.00, sku: "10302" },
      "2 7/8 x 1 5/8": { price: 9.16, sku: "10305" },
      "2 7/8 x 1 7/8": { price: 0.00, sku: "10308" },
      "4 x 1 5/8": { price: 10.98, sku: "10311" },
      "4 x 1 7/8": { price: 0.00, sku: "10314" }
    },
    "End": {
      "2 3/8 x 1 7/8": { price: 7.48, sku: "10303" },
      "2 7/8 x 1 5/8": { price: 8.08, sku: "10306" },
      "2 7/8 x 1 7/8": { price: 0.00, sku: "10309" },
      "4 x 1 5/8": { price: 0.00, sku: "10312" },
      "4 x 1 7/8": { price: 0.00, sku: "10315" }
    },
    "Corner": {
      "2 3/8 x 1 7/8": { price: 0.00, sku: "10304" },
      "2 7/8 x 1 5/8": { price: 0.00, sku: "10307" },
      "2 7/8 x 1 7/8": { price: 0.00, sku: "10310" },
      "4 x 1 5/8": { price: 0.00, sku: "10313" },
      "4 x 1 7/8": { price: 0.00, sku: "10316" }
    }
  },
  "Galvanized": {
    "Line": {
      "1 3/8 x 1 3/8": { price: 2.96, sku: "10317" },
      "1 5/8 x 1 3/8": { price: 3.94, sku: "10320" },
      "1 7/8 x 1 3/8": { price: 3.42, sku: "10323" },
      "1 5/8 x 1 5/8": { price: 3.40, sku: "10326" },
      "1 7/8 x 1 5/8": { price: 3.50, sku: "10329" },
      "1 7/8 x 1 7/8": { price: 8.26, sku: "10332" },
      "2 3/8 x 1 5/8": { price: 4.88, sku: "10335" },
      "2 3/8 x 1 7/8": { price: 7.58, sku: "10338" },
      "2 7/8 x 1 5/8": { price: 6.12, sku: "10341" },
      "2 7/8 x 1 7/8": { price: 7.52, sku: "10344" },
      "4 x 1 5/8": { price: 7.16, sku: "10347" },
      "4 x 1 7/8": { price: 10.50, sku: "10350" }
    },
    "End": {
      "1 3/8 x 1 3/8": { price: 2.50, sku: "10318" },
      "1 5/8 x 1 3/8": { price: 2.82, sku: "10321" },
      "1 7/8 x 1 3/8": { price: 4.84, sku: "10324" },
      "1 5/8 x 1 5/8": { price: 3.74, sku: "10327" },
      "1 7/8 x 1 5/8": { price: 3.84, sku: "10330" },
      "1 7/8 x 1 7/8": { price: 3.80, sku: "10333" },
      "2 3/8 x 1 5/8": { price: 4.48, sku: "10336" },
      "2 3/8 x 1 7/8": { price: 6.28, sku: "10339" },
      "2 7/8 x 1 5/8": { price: 4.80, sku: "10342" },
      "2 7/8 x 1 7/8": { price: 4.80, sku: "10345" },
      "4 x 1 5/8": { price: 8.24, sku: "10348" },
      "4 x 1 7/8": { price: 8.50, sku: "10351" }
    },
    "Corner": {
      "1 3/8 x 1 3/8": { price: 2.96, sku: "10319" },
      "1 5/8 x 1 3/8": { price: 0.00, sku: "10322" },
      "1 7/8 x 1 3/8": { price: 5.44, sku: "10325" },
      "1 5/8 x 1 5/8": { price: 0.00, sku: "10328" },
      "1 7/8 x 1 5/8": { price: 0.00, sku: "10331" },
      "1 7/8 x 1 7/8": { price: 0.00, sku: "10334" },
      "2 3/8 x 1 5/8": { price: 7.20, sku: "10337" },
      "2 3/8 x 1 7/8": { price: 0.00, sku: "10340" },
      "2 7/8 x 1 5/8": { price: 7.76, sku: "10343" },
      "2 7/8 x 1 7/8": { price: 0.00, sku: "10346" },
      "4 x 1 5/8": { price: 0.00, sku: "10349" },
      "4 x 1 7/8": { price: 0.00, sku: "10352" }
    }
  }
};

// Tension bars costs
export const tensionBarsCosts = {
  "Black": {
    "4": { price: 4.41, sku: "10341" },
    "5": { price: 5.45, sku: "10342" },
    "6": { price: 9.41, sku: "10343" },
    "7": { price: 15.35, sku: "10344" },
    "8": { price: 17.58, sku: "10345" }
  },
  "Galvanized": {
    "4": { price: 4.31, sku: "10351" },
    "5": { price: 3.47, sku: "10352" },
    "6": { price: 5.70, sku: "10353" },
    "7": { price: 8.51, sku: "10354" },
    "8": { price: 9.00, sku: "10355" }
  }
};

// Fence slats costs per 10 linear feet
export const slatCosts = {
  "4": { price: 59.83, sku: "10401" },
  "5": { price: 71.15, sku: "10402" },
  "6": { price: 92.17, sku: "10403" },
  "7": { price: 73.00, sku: "10404" },
  "8": { price: 124.51, sku: "10405" },
  "10": { price: 200.00, sku: "10406" }
};

// Nuts and bolts costs (per 100pc)
export const nutsAndBoltsCosts = {
  "Black": { price: 13.00, sku: "40112" },
  "Galvanized": { price: 8.00, sku: "40122" }
};

// Concrete costs
export const concreteCosts = {
  "Red": { 
    "50 pound": { price: 8.76, sku: "30001" }
  },
  "Yellow": { 
    "60 pound": { price: 6.09, sku: "30004" },
    "80 pound": { price: 6.63, sku: "30006" }
  },
  "Truck": { price: 170, sku: "10423" }    // per cubic yard
};

// Barb arms costs
export const barbArmsCosts = {
  "Black": {
    "1 5/8": { "1 3/8": null, "1 5/8": { price: 10.73, sku: "10001" } },
    "1 7/8": { "1 3/8": null, "1 5/8": { price: 10.61, sku: "10002" } },
    "2 3/8": { "1 3/8": null, "1 5/8": { price: 11.30, sku: "10003" } },
    "2 7/8": { "1 3/8": null, "1 5/8": { price: 21.18, sku: "10004" } },
    "4": { "1 3/8": null, "1 5/8": { price: 34.34, sku: "10005" } }
  },
  "Galvanized": {
    "1 5/8": { "1 3/8": null, "1 5/8": { price: 7.13, sku: "10006" } },
    "1 7/8": { "1 3/8": null, "1 5/8": { price: 6.05, sku: "10007" } },
    "2 3/8": { "1 3/8": null, "1 5/8": { price: 7.52, sku: "10008" } },
    "2 7/8": { "1 3/8": null, "1 5/8": { price: 14.24, sku: "10009" } },
    "4": { "1 3/8": null, "1 5/8": { price: 17.84, sku: "10010" } }
  }
};

// EZ twist ties costs
export const ezTwistTiesCosts = {
  "9 gauge": {
    "1 5/8": { price: 30.14, sku: "10361" },
    "2": { price: 32.18, sku: "10363" },
    "2 3/8": { price: 0.00, sku: "10365" },
    "3": { price: 40.31, sku: "10367" },
    "4": { price: 36.48, sku: "10368" }
  },
  "11 gauge": {
    "1 5/8": { price: 21.30, sku: "10362" },
    "2": { price: 22.29, sku: "10364" },
    "2 3/8": { price: 29.31, sku: "10366" }
  }
};

// Privacy screen chain link costs
export const privacyScreenCosts = {
  "Tan": {
    "4": { price: 84.15, sku: "10381" },
    "5": { price: 0.00, sku: "10384" },
    "6": { price: 95.70, sku: "10387" },
    "7": { price: 0.00, sku: "10390" },
    "8": { price: 0.00, sku: "10393" }
  },
  "Green": {
    "4": { price: 54.45, sku: "10382" },
    "5": { price: 70.95, sku: "10385" },
    "6": { price: 89.10, sku: "10388" },
    "7": { price: 0.00, sku: "10391" },
    "8": { price: 100.65, sku: "10394" }
  },
  "Black": {
    "4": { price: 54.45, sku: "10383" },
    "5": { price: 59.40, sku: "10386" },
    "6": { price: 64.35, sku: "10389" },
    "7": { price: 0.00, sku: "10392" },
    "8": { price: 140.92, sku: "10395" }
  }
};

// Privacy slats (wave style) chain link costs
export const privacySlatsCosts = {
  "Green": {
    "4": { price: 61.05, sku: "10401" },
    "5": { price: 72.60, sku: "10404" },
    "6": { price: 94.05, sku: "10407" },
    "8": { price: 123.75, sku: "10410" }
  },
  "Black": {
    "4": { price: 61.05, sku: "10402" },
    "5": { price: 72.60, sku: "10405" },
    "6": { price: 94.05, sku: "10408" },
    "8": { price: 125.40, sku: "10411" }
  },
  "Tan": {
    "4": { price: 61.05, sku: "10403" },
    "5": { price: 72.60, sku: "10406" },
    "6": { price: 94.05, sku: "10409" },
    "8": { price: 127.05, sku: "10412" }
  },
  "White": {
    "4": { price: 62.22, sku: "11759" },
    "5": { price: 77.75, sku: "11760" },
    "6": { price: 0.00, sku: "11761" },
    "8": { price: 0.00, sku: "11762" }
  }
};
