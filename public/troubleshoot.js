// Simple troubleshooting script that runs before the main app
(function() {
  console.log("Troubleshooting script running...");
  
  // Check if React is available globally (for development troubleshooting)
  window.checkReact = function() {
    if (window.React) {
      console.log("React is available globally:", window.React.version);
    } else {
      console.log("React is not available globally (this is normal in production builds)");
    }
  };
  
  // Check browser compatibility
  const checkBrowserCompatibility = function() {
    const issues = [];
    
    // Check for basic ES6 support
    try {
      new Function('(a = 0) => a');
    } catch (e) {
      issues.push('Arrow functions not supported');
    }
    
    try {
      new Function('class Test {}');
    } catch (e) {
      issues.push('ES6 classes not supported');
    }
    
    // Check for Promise support
    if (typeof Promise === 'undefined') {
      issues.push('Promises not supported');
    }
    
    // Check for fetch API
    if (typeof fetch === 'undefined') {
      issues.push('Fetch API not supported');
    }
    
    return {
      compatible: issues.length === 0,
      issues: issues
    };
  };
  
  const compatibility = checkBrowserCompatibility();
  console.log("Browser compatibility:", compatibility);
  
  if (!compatibility.compatible) {
    console.warn("Your browser may not be fully compatible with this application.");
  }
  
  // Add helper to check if resources loaded
  window.checkResources = function() {
    const scripts = document.querySelectorAll('script');
    const styles = document.querySelectorAll('link[rel="stylesheet"]');
    
    console.log("Scripts loaded:", scripts.length);
    console.log("Stylesheets loaded:", styles.length);
    
    return {
      scripts: Array.from(scripts).map(s => s.src || 'inline'),
      styles: Array.from(styles).map(s => s.href)
    };
  };
  
  // Simple DOM ready check
  window.addEventListener('DOMContentLoaded', function() {
    console.log("DOM fully loaded and parsed");
    const root = document.getElementById('root');
    if (root) {
      console.log("Root element found:", root);
    } else {
      console.error("Root element NOT found!");
    }
  });
  
  // Add to window global for console access
  window.troubleshoot = {
    checkReact: window.checkReact,
    checkResources: window.checkResources,
    compatibility: compatibility
  };
  
  console.log("Troubleshooting utilities available via 'window.troubleshoot'");
})();
