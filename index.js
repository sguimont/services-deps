const fs = require('fs');

const depsFileContent = fs.readFileSync('./service-deps.txt').toString('UTF-8');
const deps = depsFileContent.split('\n');

const services = {};

deps.forEach((dep) => {
    if (dep.trim()) {

        // Skip deps
        if (dep.indexOf('test') !== -1 ||
            dep.indexOf('ame-migration-job') !== -1 ||
            dep.indexOf('collection') !== -1
        ) {
            return;
        }

        const depParts = dep.split('/');
        let moduleName = depParts[1].substr(10);
        if (moduleName.indexOf('-api') !== -1) {
            moduleName = moduleName.substr(0, moduleName.indexOf('-api'));
        }

        // Skip module
        if (moduleName.indexOf('console') !== -1 ||
            moduleName.indexOf('fake') !== -1
        ) {
            return;
        }

        let currentModule = services[moduleName];
        if (!currentModule) {
            services[moduleName] = [];
            currentModule = services[moduleName];
        }

        let depName = depParts[depParts.length - 1];
        depName = depName.substr(0, depName.lastIndexOf('-'));

        // Rename deps
        if (depName === 'transaction') {
            depName = 'trx';
        }
        if (depName === 'wallet') {
            depName = 'trx';
        }
        if (depName === 'card-application') {
            depName = 'application';
        }

        if (currentModule.indexOf(depName) === -1) {
            // Skip dep links
            if (depName !== 'context' &&
                depName !== 'template-assembler' &&
                depName !== 'call-context' &&
                depName !== 'bmo-parser' &&
                depName !== 'transaction-augmenter' &&
                depName !== 'transaction-event' &&
                depName !== 'available-actual-amount-split' &&
                depName !== 'authorization-validation' &&
                depName !== 'load-validation' &&
                depName !== 'mongodb' &&
                depName !== 'job-prepare' &&
                depName !== 'gps-report-parser' &&
                depName !== 'sql-field-helper' &&
                depName !== 'visa-vss-report' &&
                depName !== 'string' &&
                depName !== 'activity-event' &&
                depName !== 'notification-template' &&
                depName !== 'card-aml-status-event' &&
                depName !== 'card-application-event' &&
                depName !== 'equifax-parser' &&
                depName !== 'kyc-policies' &&
                depName !== 'file-loader' &&
                depName !== 'job-progress-tracker' &&
                depName !== 'card-policies' &&
                depName !== 'gps-transaction-event' &&
                depName !== 'pad-mapping-event' &&
                depName !== 'ehi' &&
                depName !== 'load-unload-wallet' &&
                depName !== 'utility' &&
                depName !== 'wallet-builder' &&
                depName !== 'card-policies' &&
                depName !== 'activation-code-generator' &&
                depName !== 'equifax-request-payload-builder' &&
                depName !== 'card-required-informations' &&
                depName !== 'merchant-policies' &&
                depName !== 'card-aml-status' &&
                depName !== 'date' &&
                depName !== 'sms' &&
                depName !== 'jira-policy'
            ) {
                currentModule.push(depName)
            }
        }
    }
});

console.log(JSON.stringify(services, null, 2));
