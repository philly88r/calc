// Post costs
export const postCosts = {
  "Black": {
    "0.065": {
      "1 3/8": 1.31,
      "1 5/8": 2.08,
      "1 7/8": 2.45,
      "2 3/8": 3.16
    },
    "SCH 20": {
      "1 3/8": 2.31,
      "1 5/8": 2.4,
      "1 7/8": 2.28,
      "2 3/8": 3.44
    },
    "SCH 40": {
      "1 5/8": 4.3,
      "1 7/8": 5.01,
      "2 3/8": 5.5,
      "2 7/8": 8.8,
      "4": 18.44
    }
  },
  "Galvanized": {
    "0.065": {
      "1 3/8": 1.16,
      "1 5/8": 1.41,
      "1 7/8": 2.16,
      "2 3/8": 2.4
    },
    "SCH 20": {
      "1 3/8": 1.81,
      "1 5/8": 2.0,
      "1 7/8": 2.38,
      "2 3/8": 3.0
    },
    "SCH 40": {
      "1 5/8": 2.15,
      "1 7/8": 3.11,
      "2 3/8": 3.91,
      "2 7/8": 6.13,
      "4": 7.9
    },
    "High zinc": {
      "2 3/8": 4.6,
      "2 7/8": 6.78,
      "4": 10.89
    }
  }
};

// Mesh costs
export const meshCosts = {
  "8F": 1.55,
  "9F": 0.62,
  "9G": 0.92,
  "11G": 0.59
};

// Dome cap costs
export const domeCapCosts = {
  "Black": {
    "1 5/8": 1.37,
    "1 7/8": 6.10,
    "2 3/8": 1.23,
    "2 7/8": 2.41,
    "4": 3.74
  },
  "Galvanized": {
    "1 5/8": 0.86,
    "1 7/8": 1.59,
    "2 3/8": 1.29,
    "2 7/8": 1.72,
    "4": 4.08
  }
};

// Fence ties costs (100 pc)
export const fenceTiesCosts = {
  "Black": 17.64,
  "Galvanized": 21.56
};

// Hog rings costs (1lb)
export const hogRingsCosts = {
  "Black": {
    "9 gauge": 5.53,
    "12.5 gauge": 11.72
  },
  "Galvanized": {
    "9 gauge": 3.76,
    "12.5 gauge": 3.53
  }
};

// Wedge anchor costs - 1/2" x 3 3/4"
export const wedgeAnchorCosts = {
  "Black": 0.94,
  "Galvanized": 0.94
};

// Eye tops / loop caps costs
export const eyeTopsCosts = {
  "Black": {
    "1 5/8": {
      "1 3/8": 1.61,
      "1 5/8": 2.45
    },
    "1 7/8": {
      "1 3/8": 4.27,
      "1 5/8": 2.55
    },
    "2 3/8": {
      "1 3/8": null,
      "1 5/8": 2.90
    },
    "2 7/8": {
      "1 3/8": null,
      "1 5/8": 6.43
    },
    "4": {
      "1 3/8": null,
      "1 5/8": 8.73
    }
  },
  "Galvanized": {
    "1 5/8": {
      "1 3/8": 2.38,
      "1 5/8": 2.21
    },
    "1 7/8": {
      "1 3/8": 2.45,
      "1 5/8": 1.69
    },
    "2 3/8": {
      "1 3/8": null,
      "1 5/8": 2.51
    },
    "2 7/8": {
      "1 3/8": null,
      "1 5/8": 5.10
    },
    "4": {
      "1 3/8": null,
      "1 5/8": 6.37
    }
  }
};

// Hinge prices
export const hingePrices = {
  residential: {
    male: {
      black: {
        '2 3/8': 4.94,
        '2 7/8': 6.33,
        '4': null
      },
      galvanized: {
        '2 3/8': 3.39,
        '2 7/8': 4.88,
        '4': 7.80
      }
    },
    female: {
      black: {
        '1 3/8': 2.53,
        '1 5/8': 2.66,
        '1 7/8': 3.51
      },
      galvanized: {
        '1 3/8': 2.18,
        '1 5/8': 1.88,
        '1 7/8': 2.90
      }
    }
  },
  bulldog: {
    black: {
      '2 3/8': 19.60,
      '2 7/8': 17.84,
      '4': 58.68
    },
    galvanized: {
      '2 3/8': 15.29,
      '2 7/8': 14.01,
      '4': 17.89
    }
  },
  '180degree': {
    black: {
      '2 3/8': 28.87,
      '2 7/8': 29.75,
      '4': 38.57
    },
    galvanized: {
      '2 3/8': 18.11,
      '2 7/8': 20.54,
      '4': 17.84
    }
  }
};

// Sliding gate roller price
export const rollerPrice = 83.3; // Each gate needs 4 rollers
