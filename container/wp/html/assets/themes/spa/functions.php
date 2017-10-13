<?php

// require_once( WP_CONTENT_DIR . '/includes/global.php' );

// function my_enqueue_scripts() {
//     wp_enqueue_script( 'app', get_template_directory_uri() . '/js/app.min.js', array(), false, true );
//     wp_localize_script( 'app', 'WP_API_Settings', array(
//         'root' => esc_url_raw( rest_url() ),
//         'nonce' => wp_create_nonce( 'wp_rest' ),
//         'nonce_postman' => wp_create_nonce( 'the-postman' )
//     ) );
// }
// add_action( 'wp_enqueue_scripts', 'my_enqueue_scripts' );


/* ----------------------------------------------------------

  helper

---------------------------------------------------------- */

function get_partial($str, $option = null)
{

  get_template_part('partial/'.$str, $option);

}