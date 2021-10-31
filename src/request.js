function asyncRequest(method, url, onSuccess, onFailure) {
  return new Promise((resolve, reject) => {
    try {
      let xhr = new XMLHttpRequest();
      xhr.open(method, url);
      xhr.setRequestHeader(
        "Content-type",
        "application/x-www-form-urlencoded; charset=ISO-8859-1"
      );
      xhr.send();
      xhr.onload = function () {
        if (xhr.status != 200) {
          onFailure(xhr.response);
          return reject(xhr.response);
        }
        onSuccess(xhr.response);
        resolve(xhr.response);
      };
      xhr.onerror = function () {
        onFailure(xhr.response);
        reject(xhr.response);
      };
    } catch (e) {
      reject(e);
    }
  });
}

const data = {
  login: "makarovmikhail",
  id: 15658377,
  node_id: "MDQ6VXNlcjE1NjU4Mzc3",
  avatar_url: "https://avatars.githubusercontent.com/u/15658377?v=4",
  gravatar_id: "",
  url: "https://api.github.com/users/makarovmikhail",
  html_url: "https://github.com/makarovmikhail",
  followers_url: "https://api.github.com/users/makarovmikhail/followers",
  following_url:
    "https://api.github.com/users/makarovmikhail/following{/other_user}",
  gists_url: "https://api.github.com/users/makarovmikhail/gists{/gist_id}",
  starred_url:
    "https://api.github.com/users/makarovmikhail/starred{/owner}{/repo}",
  subscriptions_url:
    "https://api.github.com/users/makarovmikhail/subscriptions",
  organizations_url: "https://api.github.com/users/makarovmikhail/orgs",
  repos_url: "https://api.github.com/users/makarovmikhail/repos",
  events_url: "https://api.github.com/users/makarovmikhail/events{/privacy}",
  received_events_url:
    "https://api.github.com/users/makarovmikhail/received_events",
  type: "User",
  site_admin: false,
  name: "Mikhail",
  company: null,
  blog: "",
  location: "Saint Petersburg",
  email: null,
  hireable: null,
  bio: null,
  twitter_username: null,
  public_repos: 25,
  public_gists: 0,
  followers: 3,
  following: 3,
  created_at: "2015-11-04T19:17:34Z",
  updated_at: "2021-10-18T15:13:43Z"
};

function asyncRequestMock(method, url, onSuccess, onFailure) {
  return new Promise((resolve, reject) => {
    try {
      onSuccess(JSON.stringify(data));
      resolve(JSON.stringify(data));
    } catch (e) {
      reject(e);
    }
  });
}
