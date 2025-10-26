<?php
/**! Do not allow directly accessing this file.
 * ------------------------------------------------ */
if ( ! defined( 'ABSPATH' ) ) exit( 'Direct script access denied.' );

function bdaia_shorty_padding( $atts, $content, $code='' )
{
	$left = $right = "";

	if( is_array( $atts ) ) extract($atts);

	$stylecss = "";
	if( !empty( $left ) || !empty( $right ) ) {
		$stylecss = 'style="';
		if( !empty( $left  )  ) $stylecss .= 'padding-left:'.$left.'!important;';
		if( !empty( $right )  ) $stylecss .= 'padding-right:'.$right.'!important;';
		$stylecss .= '"';
	}

	return '<div class="bdaia-'.$code.'"'.$stylecss.'>'. do_shortcode( $content ) .'</div>';
}
add_shortcode( 'padding', 'bdaia_shorty_padding' );