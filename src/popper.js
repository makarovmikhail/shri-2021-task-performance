const input = document.querySelector("#github-profile");
const tooltip = document.querySelector("#tooltip");

const popperInstance = Popper.createPopper(input, tooltip, {
  modifiers: [
    {
      name: "offset",
      options: {
        offset: [0, 8]
      }
    }
  ]
});

const show = (message) => {
  document.querySelector("#message").innerHTML = message;
  tooltip.setAttribute("data-show", "");
  popperInstance.update();
};

const hide = () => {
  document.querySelector("#message").innerHTML = "";
  tooltip.removeAttribute("data-show");
};

const hideEvents = ["mouseleave", "blur", "focus"];
hideEvents.forEach((event) => {
  input.addEventListener(event, hide);
});
