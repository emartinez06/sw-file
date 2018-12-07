# Service Worker
A service worker file to use on your projects. 

### How to use
1. Add this code snippet to your HTML files: ```<script>
                                                         if ('serviceWorker' in navigator) {
                                                             navigator.serviceWorker.register('sw.js', {scope: '/'})
                                                                 .then(function(regSW) {
                                                                     // registration worked
                                                                     console.log('Registration succeeded. Scope is ' + regSW.scope);
                                                                 }).catch(function(error) {
                                                                 // registration failed
                                                                 console.log('Registration failed with ' + error);
                                                             });
                                                         }else{
                                                             alert('Cache not supported on your browser, please upgrade to a current one');
                                                             location.replace("https://browsehappy.com/");
                                                         }
                                                     </script>```.
2. Open the sw.js file and add all the files that you want to be cached inside the files array variable. Example: ```let files = ['/','.index.html'];```. 
The *cacheName* variable is the name that your cache storage will have.
Example: ```let cacheName = 'my-cache-name'```.
3. Done. Now you have a service worker ready to use.