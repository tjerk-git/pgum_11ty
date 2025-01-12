document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('profileCanvas');
    const ctx = canvas.getContext('2d');
    const image = new Image();
    image.src = '/images/tjerk-dijkstra.jpg';
    const tooltip = document.querySelector('.tooltip');

    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;

    function setCanvasSize() {
        canvas.width = image.width;
        canvas.height = image.height;
        
        // Draw image initially
        ctx.drawImage(image, 0, 0);
        
        // Get pink color from CSS variable
        const pinkColor = getComputedStyle(document.documentElement)
            .getPropertyValue('--pink').trim();
        
        ctx.strokeStyle = pinkColor;
        ctx.lineWidth = 20;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.globalCompositeOperation = 'destination-out';
    }

    function getCoordinates(e) {
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        
        // Handle both mouse and touch events
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        
        return [
            (clientX - rect.left) * scaleX,
            (clientY - rect.top) * scaleY
        ];
    }

    function draw(e) {
        if (!isDrawing) return;
        e.preventDefault();

        const [currentX, currentY] = getCoordinates(e);

        // Draw the eraser circle
        ctx.beginPath();
        ctx.arc(currentX, currentY, ctx.lineWidth / 2, 0, Math.PI * 2);
        ctx.fill();

        // Draw the connecting line for smooth effect
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(currentX, currentY);
        ctx.stroke();

        [lastX, lastY] = [currentX, currentY];
    }

    function startDrawing(e) {
        isDrawing = true;
        [lastX, lastY] = getCoordinates(e);
    }

    function stopDrawing() {
        isDrawing = false;
    }

    function removeTooltip() {
        if (tooltip) {
            tooltip.style.display = 'none';
            // Remove the event listener after first use
            canvas.removeEventListener('mouseenter', removeTooltip);
            canvas.removeEventListener('touchstart', removeTooltip);
        }
    }

    image.onload = setCanvasSize;

    // Mouse events
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);
    canvas.addEventListener('mouseenter', removeTooltip);

    // Touch events
    canvas.addEventListener('touchstart', startDrawing, { passive: false });
    canvas.addEventListener('touchmove', draw, { passive: false });
    canvas.addEventListener('touchend', stopDrawing);
    canvas.addEventListener('touchcancel', stopDrawing);
    canvas.addEventListener('touchstart', removeTooltip);

    // Handle window resize
    window.addEventListener('resize', () => {
        const tempCanvas = document.createElement('canvas');
        const tempCtx = tempCanvas.getContext('2d');
        tempCanvas.width = canvas.width;
        tempCanvas.height = canvas.height;
        tempCtx.drawImage(canvas, 0, 0);
        
        setCanvasSize();
        ctx.drawImage(tempCanvas, 0, 0);
    });
});
