<?php

/**
 * Plugin Name: HubSpot OAuth Example
 * Author: HubSpot
 */

add_action( 'wp_ajax_hubspot_connect', function () {
	$token = $_POST['token'];
	update_option('hubspot_token', $token);
} );

add_action( 'wp_ajax_hubspot_disconnect', function () {
	delete_option('hubspot_token');
} );

add_action( 'admin_menu', function () {
	add_menu_page('HubSpot', 'HubSpot', 'edit_posts', 'hubspot', 'hubspot_admin' );
});


function hubspot_admin() {

	$connected = get_option('hubspot_token');
	
	if ($connected) {
		?>
		<?php var_dump(get_option('hubspot_token')); ?>
		<button id="hubspot-disconnect-button" class="button button-primary">Disconnect</button>
		<script>
			document.getElementById('hubspot-disconnect-button').addEventListener('click', function() {
				jQuery.post('<?php echo admin_url('admin-ajax.php?action=hubspot_disconnect'); ?>', {}, function(data) {
					location.reload();
				});
			});
		</script>
		<?php
	} else {
		?>
		<script src="https://local.hsappstatic.net/signup-ui-lego-embedder/static/js/embedder.js"></script>
		<button id="hubspot-connect-button" class="button button-primary">Connect to HubSpot</button>
		<script>
			const oauthRedirectUri = 'https://plugin-example.vercel.app/'
			document.getElementById('hubspot-connect-button').addEventListener('click', function() {
				new SignupEmbedder()
				.setFlow('integrations')
				.addQueryParam('integration_id', 'wpforms')
				.setOptions(
					new SignupEmbedderOptions()
						.setOAuth(
							'a60088dd-351d-4b37-9313-33241070b93f',
							'contacts',
							oauthRedirectUri
						)
					)
				.asPopup();

			});

			window.addEventListener('message', (event) => {
				if (
					event.origin === new URL(oauthRedirectUri).origin &&
					event.data.access_token
				) {
					jQuery.post(
						'<?php echo admin_url('admin-ajax.php?action=hubspot_connect'); ?>',
						{ token: event.data},
						function(data) {
							location.reload();
						}
					);
				}
			})
		</script>
		<?php
		
	}
}
