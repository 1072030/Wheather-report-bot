$(document).ready(() => {
  $("[name=gridRadios]").click(() => {
    if ($("[name=gridRadios]:checked").val() === "text") {
      $("#actionText").attr("disabled", false);
      $("#actionUri").attr("disabled", true);
    } else if ($("[name=gridRadios]:checked").val() === "uri") {
      $("#actionText").attr("disabled", true);
      $("#actionUri").attr("disabled", false);
    }
  });
  $("#Type").click(() => {
    $(".ReturnMessage").html(``);
    if ($("#Type option:selected").val() === "text") {
      DisplayShow("#textTemplate");
      DisplayHide("#confirmTemplate");
      DisplayHide("#imageTemplate");
      DisplayHide("#imageCarouselTemplate");
    } else if ($("#Type option:selected").val() === "image") {
      DisplayShow("#imageTemplate");
      DisplayHide("#textTemplate");
      DisplayHide("#confirmTemplate");
      DisplayHide("#imageCarouselTemplate");
    } else if ($("#Type option:selected").val() === "confirm") {
      DisplayShow("#confirmTemplate");
      DisplayHide("#textTemplate");
      DisplayHide("#imageTemplate");
      DisplayHide("#imageCarouselTemplate");
    } else if ($("#Type option:selected").val() === "imageCarousel") {
      DisplayShow("#imageCarouselTemplate");
      DisplayHide("#confirmTemplate");
      DisplayHide("#textTemplate");
      DisplayHide("#imageTemplate");
    }
  });
  $("#numberOfPicture").click(() => {
    const number = $("#numberOfPicture option:selected").val();
    if (number == "1") {
      DisplayShow("#block1");
      DisplayHide("#block2");
      DisplayHide("#block3");
      DisplayHide("#block4");
    } else if (number == "2") {
      DisplayShow("#block2");
      DisplayHide("#block3");
      DisplayHide("#block4");
    } else if (number == "3") {
      DisplayShow("#block3");
      DisplayHide("#block4");
    } else {
      DisplayShow("#block4");
    }
  });
  $(".replyMessageType").each((i, n) => {
    $(n).on("click", () => {
      console.log(i);
      if (
        $("#imageCarouselTemplate").find(".replyMessageType").get(i).value ==
        "text"
      ) {
        $("#imageCarouselTemplate").find(".action_textReply")[i].style.display =
          "block";
        $("#imageCarouselTemplate").find(".action_UriReply")[i].style.display =
          "none";
      } else if (
        $("#imageCarouselTemplate").find(".replyMessageType").get(i).value ==
        "uri"
      ) {
        $("#imageCarouselTemplate").find(".action_textReply")[i].style.display =
          "none";
        $("#imageCarouselTemplate").find(".action_UriReply")[i].style.display =
          "block";
      }
    });
  });

  $("[name=gridRadios_btn2]").click(() => {
    if ($("[name=gridRadios_btn2]:checked").val() === "text") {
      $("#actionText_btn2").attr("disabled", false);
      $("#actionUri_btn2").attr("disabled", true);
    } else if ($("[name=gridRadios_btn2]:checked").val() === "uri") {
      $("#actionText_btn2").attr("disabled", true);
      $("#actionUri_btn2").attr("disabled", false);
    }
  });
  $(".updateBeacon").click(async () => {
    let uri = `beacon`;
    if ($("#Type option:selected").val() === "confirm") {
      let data = {
        beaconId: document.getElementById("hwid").value,
        type: $("#Type option:selected").val(),
        altText: document.getElementById("AltText").value,
        contentText: document.getElementById("contentText").value,

        confirmType: $("[name=gridRadios]:checked").val(),
        confirmLabel: document.getElementById("actionLabel").value,
        confirmText: document.getElementById("actionText").value,
        confirmUri: document.getElementById("actionUri").value,

        denyType: $("[name=gridRadios_btn2]:checked").val(),
        denyLabel: document.getElementById("actionLabel_btn2").value,
        denyText: document.getElementById("actionText_btn2").value,
        denyUri: document.getElementById("actionUri_btn2").value,
      };
      api(uri, data);
    } else if ($("#Type option:selected").val() === "text") {
      let data = {
        beaconId: document.getElementById("hwid").value,
        type: $("#Type option:selected").val(),
        text: $("#TextMessage").val(),
      };
      api(uri, data);
    } else if ($("#Type option:selected").val() === "imageCarousel") {
      let data = {
        beaconId: document.getElementById("hwid").value,
        type: $("#Type option:selected").val(),
        //altText:
      };
      // api(uri, data);
    }
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
        return res.json();
      })
      .then((result) => {
        console.log(result);
        $(".ReturnMessage").html(`${result.message}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const DisplayShow = (name) => {
    $(`${name}`).css("display", "block");
  };
  const DisplayHide = (name) => {
    $(`${name}`).css("display", "none");
  };
});
