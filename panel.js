var tabs = Ext.Create('Ext.tab.Panel', {
    items: [
        {
            title: 'Tab 1',
            html : 'A simple tab'
        },
        {
            id   : 'remove-this-tab',
            title: 'Tab 2',
            html : 'Another one'
        }
    ],
    renderTo : Ext.getBody()
});

Ext.Create('Ext.button.Button', {
    text    : 'Remove tab',
    scope   : this,
    handler : function() {
        var tab = Ext.getCmp('remove-this-tab');
        tabs.remove(tab);
    },
    renderTo : Ext.getBody()
});
