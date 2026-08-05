export function LoadingError(msg, handler) {
  const reloadBtn = document.createElement("button");
  reloadBtn.addEventListener("click", handler);
  reloadBtn.innerText = "Försök igen";
  reloadBtn.type = "button";
  reloadBtn.classList.add("btn", "btn-info", "mt-3");

  const releaodMsg = document.createElement("p");
  releaodMsg.innerText = msg;

  const reloadCtn = document.createElement("div");
  reloadCtn.classList.add("col", "justify-content-center");

  reloadCtn.appendChild(releaodMsg);
  reloadCtn.appendChild(reloadBtn);

  return reloadCtn;
}
