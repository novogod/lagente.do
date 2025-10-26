<?php
/**! Do not allow directly accessing this file.
 * ------------------------------------------------ */
if ( ! defined( 'ABSPATH' ) ) exit( 'Direct script access denied.' );

function bdaia_shorty_tooltip( $atts, $content )
{
	$gravity = $text = $txtcolor = $stylecss = "";

	if( is_array( $atts ) ) extract( $atts );

	if( !empty( $txtcolor ) ) {
		$stylecss = 'style="';
		if( !empty( $txtcolor  )  ) $stylecss .= 'color:'.$txtcolor.';';
		$stylecss .= '"';
	}

	return '<span '.$stylecss.' class="bdaia-tooltip tooltip-'.$gravity.'" title="'.$text.'">'.$content.'</span>';
}
add_shortcode( 'tooltip', 'bdaia_shorty_tooltip' );
