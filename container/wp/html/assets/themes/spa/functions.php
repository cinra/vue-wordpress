<?php

// require_once( WP_CONTENT_DIR . '/includes/global.php' );

function my_enqueue_scripts() {
    wp_enqueue_script( 'app', get_template_directory_uri() . '/js/app.min.js', array(), false, true );
    wp_localize_script( 'app', 'WP_API_Settings', array(
        'root' => esc_url_raw( rest_url() ),
        'nonce' => wp_create_nonce( 'wp_rest' ),
        'nonce_postman' => wp_create_nonce( 'the-postman' ),
        'nonce_wpcf7' => wpcf7_create_nonce()
    ) );
}
add_action( 'wp_enqueue_scripts', 'my_enqueue_scripts' );


/* ----------------------------------------------------------

  helper

---------------------------------------------------------- */

function get_partial($str, $option = null)
{

  get_template_part('partial/'.$str, $option);

}


/* ----------------------------------------------------------

  ￼Change the preview urls

---------------------------------------------------------- */

// function cinra_replace_preview_post_link ( $url, $post )
// {

//   if (!$post->post_type || !in_array($post->post_type, array('work', 'post')) ) return $url;

//   parse_str( parse_url($url, PHP_URL_QUERY), $queries );

//   $type = $post->post_type === 'post' ? 'news' : $post->post_type;

//   $url = home_url($type . '/' . $post->ID) . '?' . build_query( $queries );

//   return $url;

// }
// add_filter('preview_post_link', 'cinra_replace_preview_post_link', 10, 2);

