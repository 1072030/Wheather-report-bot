$(document).ready(() => {
  $("#updateBeacon").click(async () => {
    let uri = `beacon`;
    let data = {
      hwid: document.getElementById("hwid").value,
      type: $("#Type option:selected").val(),
      actionType: $("[name=gridRadios]:checked").val(),
      altText: document.getElementById("AltText").value,
      contentText: document.getElementById("contentText").value,
      actionLabel: document.getElementById("actionLabel").value,
      actionText: document.getElementById("actionText").value,
      actionUri: document.getElementById("actionUri").value,
    };
    api(uri, data);
  });
  const api = async (url, data) => {
    console.log(data);
    await fetch(url, {
      body: JSON.stringify(data),
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
});
