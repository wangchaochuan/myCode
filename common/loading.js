function showLoading(text = "加载中,请稍候") {
    let template = `
    <div class="modal-wrap">
        <div class="modal-content">
            <div class="loadEffect">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <div class="modal-tip">${text}</div>
        </div>
        <div class="modal-mask"></div>
    </div>
    `;
    const element = document.createElement('div');
    element.setAttribute('id', 'modal-wrapper');
    element.innerHTML = template;
    document.body.appendChild(element);
}

function hideLoading() {
    const element = document.getElementById('modal-wrapper');
    document.body.removeChild(element)
}