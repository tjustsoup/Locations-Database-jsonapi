export const schema = {
  locations: {
    type: "locations",
    relationships: {
      smartystreets: {
        type: "smartystreets",
      },
      geoframes: {
        type: "geoframes",
      },
      googleplaces: {
        type: "googleplaces",
      },
    },
  },
  geoframes: {
    type: "geoframes",
    relationships: {
      locations: {
        type: "locations",
      },
    },
  },
  smartystreets: {
    type: "smartystreets",
    relationships: {
      locations: {
        type: "locations",
      },
    },
  },
  googleplaces: {
    type: "googleplaces",
    relationships: {
      locations: {
        type: "locations",
      },
    },
  },
};