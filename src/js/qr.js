let btn = document.querySelector('#generate');
        let qrcodeImg = document.querySelector('.qrcode');
        let qrcodeCanvas = document.getElementById('qrcode-canvas');
        let downloadButton = document.getElementById('downloadqr');

        btn.addEventListener('click', async (e) => {
            e.preventDefault();

            let text = document.querySelector('#text').value;
            const fgcolor = document.querySelector('#fgcolor').value.substring(1);
            const bgcolor = document.querySelector('#bgcolor').value.substring(1);

            if (text === '') {
                alert('Enter Text or URL into Textbox');
                return;
            }

            // Generate QR code URL with custom colors
            let qrcodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(text)}&color=${fgcolor}&bgcolor=${bgcolor}`;

            // Load the QR code image onto the canvas for download
            let img = new Image();
            img.crossOrigin = "anonymous"; // Handle CORS for external image
            img.src = qrcodeUrl;

            img.onload = () => {
                const ctx = qrcodeCanvas.getContext('2d');
                ctx.clearRect(0, 0, qrcodeCanvas.width, qrcodeCanvas.height); // Clear previous QR code
                ctx.drawImage(img, 0, 0, qrcodeCanvas.width, qrcodeCanvas.height); // Draw QR code on canvas
                qrcodeCanvas.style.display = 'block'; // Show canvas
                qrcodeImg.style.display = 'none'; // Hide the img element
                downloadButton.style.display = 'inline-block'; // Show the download button
            };
        });

        // Download the QR code from the canvas
        downloadButton.addEventListener('click', () => {
            const link = document.createElement('a');
            link.href = qrcodeCanvas.toDataURL('image/png');
            link.download = 'qr-code.png';
            link.click();
        });