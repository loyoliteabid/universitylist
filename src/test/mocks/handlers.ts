import { http, HttpResponse } from "msw";

export const handlers = [
  http.get(
    "http://universities.hipolabs.com/search?country=United%20Arab%20Emirates",
    () => {
      return HttpResponse.json(
        [
          {
            domains: ["gmu.ac.ae"],
            country: "United Arab Emirates",
            "state-province": null,
            alpha_two_code: "AE",
            web_pages: ["http://www.gmu.ac.ae/"],
            name: "Abu Dhabi University",
          },
        ],
        { status: 200 }
      );
    }
  ),
];
