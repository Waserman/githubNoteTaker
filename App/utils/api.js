import merge from "lodash/merge";
import orderBy from "lodash/orderBy";
import parse from "url-parse";
import apiConsts from "../consts/api";
import util from "util";

function send(uri, options = {}) {
  let url = apiConsts.apiURL + uri;

  const base = {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  };

  options = merge(base, options);
  return fetch(url, options).then(res => res.json());
}

export const getBio = username => {
  return send(util.format(apiConsts.getBio, username));
};
