<?php
/**! Do not allow directly accessing this file.
 * ------------------------------------------------ */
if ( ! defined( 'ABSPATH' ) ) exit( 'Direct script access denied.' );

function bdaia_shorty_divider( $atts )
{
	$stylecss = $top = $bottom = $style = "";

	if( is_array( $atts ) ) extract( $atts );

	if( !empty( $top ) || !empty( $bottom ) ) {
		$stylecss = 'style="';
		if( !empty( $top  )  ) $stylecss .= 'margin-top:'.$top.'px !important;';
		if( !empty( $bottom )  ) $stylecss .= 'margin-bottom:'.$bottom.'px !important;';
		$stylecss .= '"';
	}

	return '<div class="bdaia-separator se-'.$style.'" '.$stylecss.'></div>';
}
add_shortcode( 'divider', 'bdaia_shorty_divider' );