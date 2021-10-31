const getProfile = () => {
  const githubProfile = document.getElementById("github-profile").value;
  return githubProfile;
};

const loadData = () => {
  const profile = getProfile();
  document.querySelector("#info").hidden = true;
  document.querySelector("#load-data").setAttribute("disabled", true);
  document.querySelector("#loader").hidden = false;
  asyncRequest(
    "GET",
    `https://api.github.com/users/${profile}`,
    (data) => {
      setData(JSON.parse(data));
      document.querySelector("#info").hidden = false;
      //   document.getElementById("info").innerHTML = data;
    },
    (error) => show(JSON.parse(error).message)
  )
    .then((data) => {
      console.log("PROMISE", data);
    })
    .catch((error) => show(JSON.parse(error).message))
    .finally(() => {
      document.querySelector("#load-data").removeAttribute("disabled");
      document.querySelector("#loader").hidden = true;
      document.querySelector("#github-profile").focus();
    });
};

const loadAvatar = async () => {
  const profile = getProfile();
  document.querySelector("#load-avatar").disabled = true;
  document.getElementById("avatar").src = "/img/loader.gif";
  asyncRequest(
    "GET",
    `https://api.github.com/users/${profile}`,
    (data) => {},
    (error) => {
      show(error);
    }
  )
    .then((data) => {
      setTimeout(() => {
        document.getElementById("avatar").src = JSON.parse(data).avatar_url;
        document.querySelector("#load-avatar").removeAttribute("disabled");
      }, 1000);
    })
    .catch((error) => {
      show(JSON.parse(error).message);
      document.getElementById("avatar").src = "/img/dummy.png";
    })
    .finally(() => {
      document.querySelector("#github-profile").focus();
    });
};

function setData(data) {
  clearData();
  if (data.name) document.getElementById("name").innerHTML = data.name;
  if (data.login) document.getElementById("login").innerHTML = data.login;
  if (data.following)
    document.getElementById("following").innerHTML = data.following;
  if (data.followers)
    document.getElementById("followers").innerHTML = data.followers;
  if (data.location)
    document.getElementById("location").innerHTML = data.location;
  if (data.public_repos)
    document.getElementById("public_repos").innerHTML = data.public_repos;
  if (data.repos_url) document.getElementById("repos").href = data.repos_url;
}

function clearData() {
  document.querySelector("#name").innerHTML = "";
  document.querySelector("#login").innerHTML = "";
  document.querySelector("#following").innerHTML = "";
  document.querySelector("#followers").innerHTML = "";
  document.querySelector("#location").innerHTML = "";
  document.querySelector("#public_repos").innerHTML = "";
  document.querySelector("#repos").removeAttribute("href");
}
