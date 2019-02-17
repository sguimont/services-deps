const fs = require('fs');

const depsFileContent = fs.readFileSync('./service-deps.txt').toString('UTF-8');
const deps = depsFileContent.split('\n');

const services = {};

deps.forEach((dep) => {
    if (dep.trim()) {
        const depParts = dep.split('/');
        let moduleName = depParts[1].substr(10);
        if (moduleName.indexOf('-api') !== -1) {
            moduleName = moduleName.substr(0, moduleName.indexOf('-api'));
        }

        let currentModule = services[moduleName];
        if (!currentModule) {
            services[moduleName] = [];
            currentModule = services[moduleName];
        }

        let depName = depParts[depParts.length - 1];
        depName = depName.substr(0, depName.lastIndexOf('-'));
        if (depName === 'transaction') {
            depName = 'trx';
        }
        if (depName === 'wallet') {
            depName = 'trx';
        }
        if (currentModule.indexOf(depName) === -1) {
            if (depName !== 'context') {
                currentModule.push(depName)
            }
        }
    }
});

console.log(JSON.stringify(services, null, 2));