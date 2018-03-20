# jquery.cep
Plugins próprios criados via JavaScript e Jquery

Veja como usar:
===============

Temos um atributo de configuração que é mandado para o plugin.

Os campos no plugin sempre vão ser:

Nome dos campos padrão
=========

- endereco_cep
- endereco_rua
- endereco_numero
- endereco_complemento
- endereco_bairro
- endereco_cidade
- endereco_estado

Nesse caso no atributo de configuração você só precisar passar o nome do módulo onde quer que o plugin funcione.

Exemplo:
=======

Estou desenvolvendo o modulo de cadastro de usuários, suponhamos que seus elementos terão as classes ou identificadores ou os names dessa forma:

- user_nome
- user_email
- user_senha

Mas agora o usuário tem endereco, então os campos de endereço ficarão assim:

- user_endereco_cep
- user_endereco_rua
- user_endereco_numero
- user_endereco_complemento
- user_endereco_bairro
- user_endereco_cidade
- user_endereco_estado

Então nada será muito difícil, utilizando o exemplo de cadastro de usuários a configuração do plugin ficará assim:

```jquery
$(document).on('blur', 'input[name=user_endereco_cep]', function () {
        const config = {
            'cep_value': $(this).val(),
            'module': 'user'
        };

        $(this).cep(config);
    });
```    
    
  Observações:
  ============
  
  Você chama o arquivo no seu projeto e configura a chamada dele dentro de um arquivo main.
  Sempre chame o plugin antes do arquivo main.  
  
