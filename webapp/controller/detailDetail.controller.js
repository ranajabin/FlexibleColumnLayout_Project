sap.ui.define([
    "sap/ui/core/mvc/Controller",
    'sap/f/library'
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, fioriLibrary) {
        "use strict";

        return Controller.extend("flexiblelayout.flexiblelayoutableproject.controller.detailDetail", {
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

                var eventBus = new sap.ui.getCore().getEventBus();
                eventBus.subscribe("detailDetail", "ShowPopup", this.onShowPopup, this);

                // var router = new sap.ui.core.UIComponent.getRouterFor(t);
                // router.getRoute("detailDetail").attachPatternMatched(t.onRouteMatch, t);

            },

            onShowPopup: function (sChanal, sEvent, oData) {
                if (sEvent === "ShowPopup") {
                    debugger;
                    var t = this;
                    // var name = sEvent.mParameters.arguments.Id;
                    var name = oData.Id;

                    var array1 = t.getView().getModel("Data1").getData().results;
                    var data = [];
                    for (var i = 0; i < array1.length; i++) {

                        if (name === array1[i].Name1) {
                            data.push(array1[i]);

                            var oModel = new sap.ui.model.json.JSONModel();
                            oModel.setData(data);
                            // that.getView().setModel(oModel, "Data11");
                            t.getView().setModel(oModel, "Data11");
                        }
                    }
                } else {
                    var msg = "Message from : Main View";
                }
                MessageBox.information(msg);
            },
            // onRouteMatch: function (evt) {
            //     debugger;
            //     var t = this;
            //     var name = evt.mParameters.arguments.Id;

            //     var array1 =t.getView().getModel("Data1").getData().results;
            //     var data = [];
            //     for (var i = 0; i < array1.length; i++) {

            //         if (name === array1[i].Name1) {
            //             data.push(array1[i]);

            //             var oModel = new sap.ui.model.json.JSONModel();
            //             oModel.setData(data);
            //             // that.getView().setModel(oModel, "Data11");
            //             t.getView().setModel(oModel, "Data11");
            //         }
            //     }
            // },

            // onEditToggleButtonPress: function () {
            //     var oObjectPage = this.getView().byId("ObjectPageLayout"),
            //         bCurrentShowFooterState = oObjectPage.getShowFooter();

            //     oObjectPage.setShowFooter(!bCurrentShowFooterState);
            // },
            // onSuppliers: function () {
            //     var oFCL = this.oView.getParent().getParent();

            //     oFCL.setLayout(fioriLibrary.LayoutType.TwoColumnsMidExpanded);
            // }

        });
    });

