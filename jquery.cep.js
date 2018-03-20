(function ($) {
    $.fn.cep = function (config) {

        $.each($('div.error-cep'), function (key, value) {
            $(this).remove();
        });

        jQuery(this).after('<div class="help-block error-cep" style="color: #dc0030;"></div>');

        const cep = $('#' + config.module + '_endereco_cep').val();
        const cep_replace_hifen = cep.replace('-', '');
        const cep_replace_underline = cep_replace_hifen.replace('_', '');
        this.cep = cep_replace_underline;

        if (this.cep.length === 8) {
            if (isNaN(this.cep) || this.cep.length !== 8 || this.cep === "undefined" || this.cep === undefined) {

                jQuery('div.error-cep').html('<p>Informe um cep válido</p>');

                jQuery('#' + config.module + '_endereco_rua').val('').attr('readonly', false);
                jQuery('#' + config.module + '_endereco_numero').val('');
                jQuery('#' + config.module + '_endereco_complemento').val('');
                jQuery('#' + config.module + '_endereco_bairro').val('').attr('readonly', false);
                jQuery('#' + config.module + '_endereco_cidade').val('').attr('readonly', false);
                jQuery('#' + config.module + '_endereco_estado').val('').attr('readonly', false);
                jQuery('#' + config.module + '_endereco_cep').val('');
                jQuery('#' + config.module + '_endereco_cep').focus();
            } else {

                jQuery.ajax('http://api.postmon.com.br/v1/cep/' + this.cep + '?format=json', {
                    method: 'GET',
                    data: {},
                    cache: false,
                    dataType: 'json',
                    beforeSend: function () {
                    },
                    success: function (data) {
                        const logradouro = data['logradouro'].split(',');
                        if (logradouro.length > 1) {
                            jQuery('#' + config.module + '_endereco_rua').val(logradouro[0]).attr('readonly', 'readonly');
                            jQuery('#' + config.module + '_endereco_numero').val(logradouro[1]).attr('readonly', 'readonly');
                            jQuery('#' + config.module + '_endereco_complemento').focus();
                        } else {
                            jQuery('#' + config.module + '_endereco_rua').val(data['logradouro']).attr('readonly', 'readonly');
                            jQuery('#' + config.module + '_endereco_numero').val('').attr('readonly', false);
                            jQuery('#' + config.module + '_endereco_numero').focus();
                            jQuery('#' + config.module + '_endereco_bairro').val(data['bairro']).attr('readonly', 'readonly');
                            jQuery('#' + config.module + '_endereco_cidade').val(data['cidade']).attr('readonly', 'readonly');
                            jQuery('#' + config.module + '_endereco_estado').val(data['estado']).attr('readonly', 'readonly');
                        }
                    },
                    error: function (xhr) {
                        console.log(xhr.status + ' - ' + xhr.statusText);

                        if (xhr.status === 503) {
                            jQuery('div.error-cep').html('<p>Cep não encontrado, preencha o endereço</p>');
                        }

                        jQuery('#' + config.module + '_endereco_rua').val('').attr('readonly', false);
                        jQuery('#' + config.module + '_endereco_numero').val('');
                        jQuery('#' + config.module + '_endereco_complemento').val('');
                        jQuery('#' + config.module + '_endereco_bairro').val('').attr('readonly', false);
                        jQuery('#' + config.module + '_endereco_cidade').val('').attr('readonly', false);
                        jQuery('#' + config.module + '_endereco_estado').val('').attr('readonly', false);
                        jQuery('#' + config.module + '_endereco_rua').focus();
                    }

                });
            }
        } else {
            jQuery('div.error-cep').html('<p>Informe um CEP Valido</p>');
            jQuery('#' + config.module + '_endereco_cep').focus();

            jQuery('#' + config.module + '_endereco_rua').val('').attr('readonly', false);
            jQuery('#' + config.module + '_endereco_numero').val('');
            jQuery('#' + config.module + '_endereco_complemento').val('');
            jQuery('#' + config.module + '_endereco_bairro').val('').attr('readonly', false);
            jQuery('#' + config.module + '_endereco_cidade').val('').attr('readonly', false);
            jQuery('#' + config.module + '_endereco_estado').val('').attr('readonly', false);
        }
    };
})(jQuery);