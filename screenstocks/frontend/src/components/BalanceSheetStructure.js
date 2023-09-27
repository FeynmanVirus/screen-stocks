export function Structure(variable) {
    variable = {
        "Assets": {
            "Current": {

            },
            "Non-Current": {

            }        
    }, "Liabilities_Equity": {
        "Equity": {

        },
        "Liability": {
            "Current": {

            },
            "Non-Current": {

            }
        }
    }}
    return variable
}

export function OrganizeBalSheet(bal_sheet, field) {
    const fieldNames = field['index']
    if (typeof fieldNames === 'string') {
        if ([
        "Cash",
        "Accounts Receivable",
        "Inventory",
        "Prepaid Expenses",
        "Short-Term Investments",
        "Notes Receivable (Short-Term)",
        "Accrued Income"
    ].some(name => fieldNames.includes(name))) {
        // Organize into current assets
        bal_sheet['Assets']['Current'][fieldNames] = field;
    } else if ([
        "Property, Plant, and Equipment (PP&E)",
        "Intangible Assets",
        "Long-Term Investments",
        "Notes Receivable (Long-Term)",
        "Deferred Tax Assets",
        "Other Non-Current Assets"
    ].some(name => fieldNames.includes(name))) {
        // Organize into non-current assets
        bal_sheet['Assets']['Non-Current'] = field;
    } else if ([
        "Accounts Payable",
        "Short-Term Debt",
        "Accrued Liabilities",
        "Short-Term Provisions",
        "Deferred Revenue",
        "Current Portion of Long-Term Debt",
        "Interest Payable"
    ].some(name => fieldNames.includes(name))) {
        bal_sheet['Liabilities_Equity']['Liability']['Current'] = field;
    } else if ([
        "Long-Term Debt",
        "Long-Term Provisions",
        "Deferred Tax Liabilities",
        "Other Non-Current Liabilities"
    ].some(name => fieldNames.includes(name))) {
        bal_sheet['Liabilities_Equity']['Liability']['Non-Current'] = field;
    } else if ([
        "Common Stock",
        "Preferred Stock",
        "Additional Paid-In Capital (APIC)",
        "Retained Earnings",
        "Treasury Stock",
        "Accumulated Other Comprehensive Income (AOCI)"
    ].some(name => fieldNames.includes(name))) {
        bal_sheet['Liabilities_Equity']['Equity']['Shareholder_Equity'] = field;
    } else if ([
        "Equity Attributable to Non-Controlling Interest"
    ].some(name => fieldNames.includes(name))) {
        bal_sheet['Liabilities_Equity']['Equity']['Non-Controlling_Interest'] = field;
    } else if ([
        "Stock Options",
        "Warrants",
        "Convertible Debt",
        "Reserves",
        "Other Equity Components"
    ].some(name => fieldNames.includes(name))) {
        bal_sheet['Liabilities_Equity']['Equity']["Additional_Equity_Components"] = field;
    } else {
        bal_sheet[fieldNames] = field
    }
}
    return bal_sheet
}