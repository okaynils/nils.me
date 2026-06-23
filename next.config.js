module.exports = {
  async headers() {
    return [
      {
        source: "/feed.xml",
        headers: [
          {
            key: "Content-Type",
            value: "text/xml; charset=utf-8",
          },
          {
            key: "Content-Disposition",
            value: "inline; filename=\"feed.xml\"",
          },
        ],
      },
    ];
  },
};
