Ext.define('Inventory.store.Artists', {
    extend: 'Ext.data.Store',
    requires: [
        'Inventory.model.Artist',
        'Ext.window.MessageBox'
    ],
    model: 'Inventory.model.Artist',

    proxy: {
        type: 'ajax',
        url: 'go/Inventory/QueryArtists',
        reader: {
            type: 'json',
            root: 'rows',
            totalProperty: 'total',
            successProperty: 'success',
            messageProperty: 'message'
        },
        listeners: {
            exception: function(proxy, response, operation) {
                var responseData = proxy.getReader().getResponseData(response);
                if (!responseData.success) {
                    Ext.Msg.alert('错误', responseData.message);
                }
            }
        }
    }
});
