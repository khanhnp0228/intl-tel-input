"use strict";

describe("separateDialCode:", function() {

  beforeEach(function() {
    intlSetup(true);
    input = $("<input>").wrap("div");
  });

  afterEach(function() {
    intlTeardown();
  });



  //* We test with "gb" because the ntl number is different to the intl number (aside from the dial code).
  describe("init plugin with initialCountry=gb", function() {

    beforeEach(function() {
      iti = window.intlTelInput(input[0], {
        separateDialCode: true,
        initialCountry: "gb",
      });
    });

    it("displays the dial code next to the input", function() {
      expect(getSelectedDialCodeElement().text()).toEqual("+44");
    });

    it("formats the placeholder correctly", function() {
      //* International format minus the dial code.
      expect(input.attr("placeholder")).toEqual("7400 123456");
    });


    describe("calling setNumber to a valid intl number", function() {

      beforeEach(function() {
        iti.setNumber("+447400123456");
      });

      it("formats the number correctly", function() {
        //* international format minus the dial code.
        expect(getInputVal()).toEqual("7400 123456");
      });

      it("calling getNumber returns the full intl number", function() {
        expect(iti.getNumber()).toEqual("+447400123456");
      });

    });

  });


  //* We test with "ca" (Canada) because we had some bugs with area codes.
  describe("init plugin with initialCountry=ca", function() {

    beforeEach(function() {
      iti = window.intlTelInput(input[0], {
        separateDialCode: true,
        initialCountry: "ca",
      });
    });

    it("sets the placeholder correctly", function() {
      //* Used to be '234-5678'.
      expect(input.attr("placeholder")).toEqual("506-234-5678");
    });

    it("calling setNumber will set the number correctly", function() {
      iti.setNumber("+15194971234");
      //* Used to be '497-1234'.
      expect(getInputVal()).toEqual("519-497-1234");
    });

  });



  //* We test with "as" because we had a bug.
  describe("init plugin with initialCountry=as", function() {

    beforeEach(function() {
      iti = window.intlTelInput(input[0], {
        separateDialCode: true,
        initialCountry: "as",
      });
    });

    it("sets the placeholder correctly", function() {
      expect(input.attr("placeholder")).toEqual("684-733-1234");
    });

    it("calling setNumber will set the number correctly", function() {
      iti.setNumber("+16847331234");

      expect(getInputVal()).toEqual("684-733-1234");
    });

  });



  //* We test with "ru" because we had a bug.
  describe("init plugin with initialCountry=ru and valid ntl number", function() {

    beforeEach(function() {
      input.val("(922) 555-1234");
      iti = window.intlTelInput(input[0], {
        separateDialCode: true,
        initialCountry: "ru",
      });
    });

    it("formats the number correctly", function() {
      //* Used to be '8 (922) 555-12-34'.
      expect(input.val()).toEqual("922 555-12-34");
    });

  });

});
