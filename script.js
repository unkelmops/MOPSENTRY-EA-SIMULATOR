document.addEventListener('DOMContentLoaded', function() {
    // Mode selection
    const modeButtons = document.querySelectorAll('.mode-btn');
    modeButtons.forEach(button => {
        button.addEventListener('click', function() {
            modeButtons.forEach(btn => {
                btn.classList.remove('active', 'bg-gray-900', 'border-primary', 'shadow-glow');
            });
            this.classList.add('active', 'bg-gray-900', 'border-primary', 'shadow-glow');
            
            // Here you would send the mode to your API
            const mode = this.getAttribute('data-mode');
            console.log(`Mode changed to: ${mode}`);
            // fetch('/api/mode', { method: 'POST', body: JSON.stringify({ mode }) });
        });
    });

    // Toggle switches
    const switches = document.querySelectorAll('.switch input');
    switches.forEach(switchEl => {
        switchEl.addEventListener('change', function() {
            const action = this.checked ? 'enabled' : 'disabled';
            const type = this.parentElement.previousElementSibling.textContent.trim();
            console.log(`${type} ${action}`);
            // fetch('/api/toggle', { method: 'POST', body: JSON.stringify({ type, action }) });
        });
    });

    // Input fields
    const inputs = document.querySelectorAll('input[type="number"]');
    inputs.forEach(input => {
        input.addEventListener('change', function() {
            const param = this.previousElementSibling.textContent.trim();
            console.log(`${param} changed to: ${this.value}`);
            // fetch('/api/params', { method: 'POST', body: JSON.stringify({ param, value: this.value }) });
        });
    });

    // Simulate live data updates
    function updateLiveData() {
        const balance = document.querySelector('.bg-gray-900 p.text-2xl');
        if (balance) {
            const current = parseFloat(balance.textContent.replace('$', '').replace(',', ''));
            const change = (Math.random() * 20 - 10).toFixed(2);
            const newBalance = (current + parseFloat(change)).toFixed(2);
            balance.textContent = `$${parseFloat(newBalance).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
            
            const pnlElement = document.querySelector('.bg-gray-900 p.text-sm');
            if (pnlElement) {
                pnlElement.textContent = change >= 0 ? `+$${Math.abs(change).toFixed(2)}` : `-$${Math.abs(change).toFixed(2)}`;
                pnlElement.className = change >= 0 ? 'text-sm text-green-400' : 'text-sm text-red-400';
            }
        }
        
        const latency = document.querySelectorAll('.font-mono.text-sm')[1];
        if (latency) {
            latency.textContent = `${Math.floor(Math.random() * 30) + 20}ms`;
        }
        
        setTimeout(updateLiveData, 5000);
    }
    
    updateLiveData();
});
