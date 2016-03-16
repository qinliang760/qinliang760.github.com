var Common = {
    init: function() {
        this.setSuggestion();
    },
    setSuggestion: function() {
        var self = this;
        function setStar(index) {
            $(".suggestion_star>li").removeClass("active");
            for (var i = 0; i < index; i++) {
                $(".suggestion_star>li").eq(i).addClass('active');
            }
        }
        var popHtml = $("#suggestion_pop").html();
        $("#suggestion_btn").click(function(event) {
            $.pepe.lightBox(popHtml, {
                model: true
            });
            $(".suggestion_star>li").addClass('active');
            $(".suggestion_star>li").hover(function(e) {
                var index = parseInt($(this).index());
                setStar(index + 1);
            }, function() {
                var num = parseInt($(".suggestion_star").attr('data-star'));
                setStar(num);
            });
            $(".suggestion_star>li").click(function(event) {
                var index = $(this).index();
                setStar(index + 1);
                $(".suggestion_star").attr('data-star', index + 1);
            });
            self.submitSuggestion();
        });
    },
    submitSuggestion: function() {
        $(".suggestion_submit").click(function(event) {
            var user_name = $("#input_suggestioin_name").val();
            var advice_content = $("#input_suggestioin_cont").val();
            var score = $("#suggestion_star").attr('data-star');
            if (!user_name) {
                $("#input_suggestioin_name").addClass('formAlert');
                return;
            }
            if (!advice_content) {
                $("#input_suggestioin_cont").addClass('formAlert');
                return;
            }
            $.post("/advice/send", {
                user_name: user_name,
                advice_content: advice_content,
                score: score
            }, function(data) {

            }, "json");
            $("#popBox,#boxModel").remove();
        });
    }
}
Common.init();
