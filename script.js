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
  
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
  
    canvas.width = qrCanvas.width;
    canvas.height = qrCanvas.height;
  
    ctx.drawImage(qrCanvas, 0, 0);
  
    if (logo && logo.src && logo.style.display !== "none") {
      const logoSize = 80;
      const borderSize = 5;
      const totalSize = logoSize + borderSize * 2;
      const x = (canvas.width - totalSize) / 2;
      const y = (canvas.height - totalSize) / 2;
  
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(x, y, totalSize, totalSize);
  
      ctx.drawImage(logo, x + borderSize, y + borderSize, logoSize, logoSize);
    }
  
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = "qrcode_com_logo.png";
    link.click();
  }  