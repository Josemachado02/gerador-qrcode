function gerarQRCode() {
    const texto = document.getElementById("texto").value;
    const qrcode = document.getElementById("qrcode");
    const logo = document.getElementById("logo");
    const imageUpload = document.getElementById("imageUpload");
    const file = imageUpload.files[0];
    const btnDownload = document.getElementById("btnDownload");
  
    qrcode.innerHTML = "";
    logo.style.display = "none";
    btnDownload.disabled = true;
  
    if (texto.trim() !== "") {
      new QRCode(qrcode, {
        text: texto,
        width: 256,
        height: 256,
        correctLevel: QRCode.CorrectLevel.H
      });
  
      if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
          logo.src = e.target.result;
          setTimeout(() => {
            logo.style.display = "block";
          }, 200);
        };
        reader.readAsDataURL(file);
      }
  
      setTimeout(() => {
        btnDownload.disabled = false;
      }, 250);
    }
  }

function baixarQRCode() {
  const qrCanvas = document.querySelector("#qrcode canvas");
  const logo = document.getElementById("logo");

  if (!qrCanvas) return;

  const scale = 3;
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = qrCanvas.width * scale;
  canvas.height = qrCanvas.height * scale;

  const borderWidth = 16 * scale;
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.drawImage(qrCanvas, borderWidth, borderWidth, canvas.width - borderWidth * 2, canvas.height - borderWidth * 2);

  if (logo && logo.src && logo.style.display !== "none") {
    const logoSize = 80 * scale;
    const borderSize = 10 * scale;
    const totalSize = logoSize + borderSize * 2;
    const x = (canvas.width - totalSize) / 2;
    const y = (canvas.height - totalSize) / 2;

    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.roundRect(x, y, totalSize, totalSize, 20 * scale);
    ctx.fill();

    const img = new Image();
    img.onload = () => {
      ctx.drawImage(img, x + borderSize, y + borderSize, logoSize, logoSize);
      const image = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = image;
      link.download = "qrcode_com_logo.png";
      link.click();
    };
    img.src = logo.src;
  } else {
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = "qrcode.png";
    link.click();
  }
}
