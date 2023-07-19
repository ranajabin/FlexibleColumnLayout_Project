sap.ui.define([
    "sap/ui/core/mvc/Controller",
    'sap/f/library'
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, fioriLibrary) {
        "use strict";

        return Controller.extend("flexiblelayout.flexiblelayoutableproject.controller.detail", {
            onInit: function () {

                var t = this;

                var oModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZCUSTOMAPP_SRV/");
                // var oModel = that.getOwnerComponent().getModel("LData");
                oModel.read("/CustomdetailsSet", {
                    success: function (odata) {

                        var oModel1 = new sap.ui.model.json.JSONModel();
                        oModel1.setData(odata);
                        t.getView().setModel(oModel1, "Data1");


                    },
                    error: function (oError) {
                        sap.ui.core.BusyIndicator.hide();
                        var message = oError;
                        var msg = $(oError.response.body).find('message').first().text();
                        var action = "OK";
                        new sap.m.MessageBox.error(msg, {

                            onClose: function () {
                                if (action === "OK") {

                                }
                            }
                        });
                    }
                })
                var router = new sap.ui.core.UIComponent.getRouterFor(t);
                router.getRoute("detail").attachPatternMatched(t.onRouteMatch, t);

            },
            onRouteMatch: function (evt) {
                debugger;
                var t = this;
                var name = evt.mParameters.arguments.Id;

                var array1 = t.getView().getModel("Data1").getData().results;
                var data = [];
                for (var i = 0; i < array1.length; i++) {

                    if (name === array1[i].Name1) {
                        data.push(array1[i]);

                        var oModel = new sap.ui.model.json.JSONModel();
                        oModel.setData(data);
                        t.getView().setModel(oModel, "Data11");
                    }
                }
            },

            // onSuppliers: function (oEvent) {
            handleItemPress: function (oEvent) {

                debugger;
                var t = this;

                var name = oEvent.mParameters.srcControl.mProperties.text;
                var oFCL = t.oView.getParent().getParent();

                oFCL.setLayout(fioriLibrary.LayoutType.ThreeColumnsMidExpanded);

                var oEventBus = new sap.ui.getCore().getEventBus();
                oEventBus.publish("detailDetail", "ShowPopup", { Id: name })

                // var router =  new sap.ui.core.UIComponent.getRouterFor(t);
                // router.navTo("detailDetail",{ Id: name });
            },

            onExit: function () {
                var eventBus = sap.ui.getCore().getEventBus();
                eventBus.unsubscribe("detailDetail", "ShowPopup", this.onShowPopup, this);
            }

        });
    });

